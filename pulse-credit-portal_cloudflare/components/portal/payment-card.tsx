'use client'

import { useState } from 'react'
import { Loader2, ShieldCheck, Lock } from 'lucide-react'

export function AdvancePaymentCard() {
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState('720')

    const handleCheckout = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseInt(amount) * 100 }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Checkout Error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="glass-card p-10 flex flex-col justify-between h-full transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-2xl group border-white/5">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-white tracking-tight">Advance Payment</h2>
                    <ShieldCheck className="w-6 h-6 text-violet-400" />
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] ml-2">Amount to Pay Off Balance</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-white">$</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-2xl font-black text-white focus:outline-none focus:border-violet-500/50 transition-all cosmic-input"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95 flex items-center justify-center disabled:opacity-50"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                'Submit Payment'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-zinc-500">
                <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Powered by Stripe</span>
                </div>
            </div>
        </div>
    )
}
