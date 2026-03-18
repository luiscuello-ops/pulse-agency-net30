import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createPortalAdminClient } from '@/lib/supabase/admin'
import { createAndSendWaveReceipt } from '@/lib/wave'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('stripe-signature') as string

    let event

    try {
        if (!signature || !endpointSecret) {
            console.error('Missing Stripe Signature or Webhook Secret')
            return NextResponse.json({ error: 'Webhook Secret Required' }, { status: 400 })
        }
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
        const error = err as Error
        console.error(`Webhook Error: ${error.message}`)
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
    }

    const supabase = createPortalAdminClient()

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as {
                id: string,
                customer: string,
                customer_email: string | null,
                amount_total: number,
                metadata: { userId?: string, user_id?: string, payment_type?: string }
            }
            const userId = session.metadata?.user_id || session.metadata?.userId

            if (userId) {
                const paymentType = session.metadata?.payment_type

                if (paymentType === 'advance_payment') {
                    // 1. Get customer's full profile (including wave_customer_id)
                    const { data: customer } = await supabase
                        .from('customers')
                        .select('id, wave_customer_id, corporate_email')
                        .eq('user_id', userId)
                        .single()

                    if (customer) {
                        // 2. Record advance payment in Supabase
                        const { error: paymentError } = await supabase.from('payments').insert({
                            customer_id: customer.id,
                            wave_payment_id: `stripe_${session.id}`,
                            amount_cents: session.amount_total,
                            status: 'paid',
                            payment_method: 'stripe_advance',
                        })
                        if (paymentError) console.error('Error recording advance payment:', paymentError)

                        // 3. Create Wave invoice + send receipt email automatically
                        if (customer.wave_customer_id) {
                            const clientEmail = customer.corporate_email || session.customer_email || ''
                            try {
                                const receipt = await createAndSendWaveReceipt({
                                    waveCustomerId: customer.wave_customer_id,
                                    amountCents: session.amount_total,
                                    customerEmail: clientEmail,
                                    description: `Advance Payment — Pulse Credit Account (Stripe ref: ${session.id.slice(-8)})`,
                                })
                                console.log('Wave receipt created & sent:', receipt)
                            } catch (waveError) {
                                // Non-critical: log but don't fail the webhook
                                console.error('Wave receipt creation failed (non-critical):', waveError)
                            }
                        } else {
                            console.warn(`No wave_customer_id for user ${userId}, skipping Wave invoice.`)
                        }
                    }
                } else {
                    // Standard subscription/onboarding payment
                    const { data: customer, error: customerError } = await supabase
                        .from('customers')
                        .update({
                            subscription_status: 'active',
                            stripe_customer_id: session.customer as string
                        })
                        .eq('user_id', userId)
                        .select()
                        .single()

                    if (customerError) {
                        console.error('Error updating customer:', customerError)
                        return NextResponse.json({ error: 'Customer update failed' }, { status: 500 })
                    }

                    if (customer) {
                        const { error: invoiceError } = await supabase.from('invoices').insert({
                            customer_id: customer.id,
                            stripe_invoice_id: session.id,
                            amount_cents: session.amount_total,
                            status: 'paid'
                        })
                        if (invoiceError) console.error('Error recording invoice:', invoiceError)
                    }
                }
            }
            break
        }

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
