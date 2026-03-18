'use client'

import { useState, useEffect } from 'react'
import { Loader2, ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export function AdvancePaymentCard() {
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const searchParams = useSearchParams()

    const paymentStatus = searchParams?.get('payment')
    const paidAmountCents = searchParams?.get('amount')
    const paidAmount = paidAmountCents ? (parseInt(paidAmountCents) / 100).toFixed(2) : null

    useEffect(() => {
        if (paymentStatus === 'success') {
            const url = new URL(window.location.href)
            url.searchParams.delete('payment')
            url.searchParams.delete('amount')
            window.history.replaceState({}, '', url.toString())
        }
    }, [paymentStatus])

    const handleCheckout = async () => {
        setError('')
        const numericAmount = parseFloat(amount)
        if (!numericAmount || numericAmount < 1) {
            setError('Please enter at least $1.00 to proceed.')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/stripe/advance-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amountCents: Math.round(numericAmount * 100) }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                setError(data.error || 'Something went wrong. Please try again.')
            }
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const presets = [100, 250, 500]

    return (
        <div className="glass-card p-10 flex flex-col justify-between h-full transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-2xl group border-white/5">
            {paymentStatus === 'success' && paidAmount ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300 py-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                        <CheckCircle2 className="relative w-20 h-20 text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Payment Received!</h2>
                        <p className="text-4xl font-black text-green-400 mt-2">${paidAmount}</p>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-3">Applied to your account</p>
                    </div>
                    <p className="text-sm text-zinc-400 max-w-xs">A receipt has been sent to your email. Your account balance will update within moments.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-white tracking-tight">Advance Payment</h2>
                        <ShieldCheck className="w-6 h-6 text-violet-400" />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] ml-2">Quick Select</label>
                            <div className="flex gap-2">
                                {presets.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(String(preset))}
                                        className={`flex-1 py-2 rounded-xl text-sm font-black border transition-all ${amount === String(preset) ? 'bg-violet-600/30 border-violet-500/50 text-violet-300' : 'bg-white/5 border-white/10 text-zinc-400 hover:border-violet-500/30 hover:text-white'}`}
                                    >
                                        ${preset}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] ml-2">Amount to Pay Off Balance</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-white">$</span>
                                <input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => { setAmount(e.target.value); setError('') }}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-2xl font-black text-white focus:outline-none focus:border-violet-500/50 transition-all cosmic-input"
                                />
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-red-400 ml-2">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-xs font-bold">{error}</p>
                                </div>
                            )}
                        </div>

                        <button
                            className="w-full py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95 flex items-center justify-center disabled:opacity-50"
                            onClick={handleCheckout}
                            disabled={isLoading || !amount}
                        >
                            {isLoading ? (
                                <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Redirecting...</>
                            ) : (
                                <>Pay {amount ? `$${parseFloat(amount).toFixed(2)}` : 'Now'}</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-zinc-500">
                <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SSL Encrypted</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Powered by Stripe</span>
            </div>
        </div>
    )
}
