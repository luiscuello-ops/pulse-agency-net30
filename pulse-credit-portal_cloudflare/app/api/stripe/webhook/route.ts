import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createPortalAdminClient } from '@/lib/supabase/admin'

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

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as {
                id: string,
                customer: string,
                amount_total: number,
                metadata: { userId?: string }
            }
            const userId = session.metadata?.userId

            if (userId) {
                // 1. Fetch/Update customer status
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

                // 2. Record invoice using customer_id
                if (customer) {
                    const { error: invoiceError } = await supabase
                        .from('invoices')
                        .insert({
                            customer_id: customer.id,
                            stripe_invoice_id: session.id,
                            amount_cents: session.amount_total,
                            status: 'paid'
                        })

                    if (invoiceError) console.error('Error recording invoice:', invoiceError)
                }
            }
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
