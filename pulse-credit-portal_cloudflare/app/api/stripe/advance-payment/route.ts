import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createPortalServerClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function POST(req: Request) {
    try {
        const origin = headers().get('origin')
        const supabase = createPortalServerClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const amountCents = parseInt(body.amountCents)

        if (!amountCents || amountCents < 100) {
            return NextResponse.json({ error: 'Minimum payment is $1.00' }, { status: 400 })
        }

        // Get customer profile for display name
        const { data: profile } = await supabase
            .from('customers')
            .select('company_name, stripe_customer_id')
            .eq('user_id', user.id)
            .single()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: profile?.stripe_customer_id ? undefined : user.email ?? undefined,
            customer: profile?.stripe_customer_id || undefined,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Advance Payment — Pulse Credit Account',
                            description: `Account credit for ${profile?.company_name || user.email}. Applied to remaining balance.`,
                        },
                        unit_amount: amountCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                user_id: user.id,
                payment_type: 'advance_payment',
            },
            invoice_creation: {
                enabled: true,
            },
            success_url: `${origin}/portal/dashboard?payment=success&amount=${amountCents}`,
            cancel_url: `${origin}/portal/dashboard?payment=cancelled`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('Advance payment error:', error)
        return NextResponse.json({ error: 'Payment session creation failed' }, { status: 500 })
    }
}
