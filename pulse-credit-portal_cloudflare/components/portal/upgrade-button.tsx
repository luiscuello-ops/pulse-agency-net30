'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Zap, Loader2 } from 'lucide-react'

export function UpgradeButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleUpgrade = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, // Frontend can pass this or backend can use default
                }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                console.error('Failed to create checkout session:', data.error)
            }
        } catch (error) {
            console.error('Upgrade Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg shadow-violet-200 h-12 px-6 font-bold"
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Zap className="mr-2 h-4 w-4 fill-current" />
            )}
            Upgrade Pro
        </Button>
    )
}
