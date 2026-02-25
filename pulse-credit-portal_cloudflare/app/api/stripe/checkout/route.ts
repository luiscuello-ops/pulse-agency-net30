import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST() {
    try {
        const origin = headers().get('origin')

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Pulse Credit Pro Plan',
                            description: 'Advanced credit repair and management services',
                        },
                        unit_amount: 4900, // $49.00
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard`,
        })

        return NextResponse.json({
            success: true,
            checkoutUrl: session.url
        })
    } catch (error) {
        console.error('Stripe Checkout Error:', error)
        return NextResponse.json({
            success: false,
            error: 'Checkout session creation failed'
        }, { status: 500 })
    }
}
