import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createPortalServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
    const supabase = createPortalServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { priceId } = await req.json()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: [
                {
                    price: priceId || process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            metadata: {
                userId: user.id,
            },
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard?canceled=true`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        const error = err as Error
        console.error('Stripe Checkout Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

