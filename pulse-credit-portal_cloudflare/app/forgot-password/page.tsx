'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortalBrowserClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const supabase = createPortalBrowserClient()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) {
                setErrorMessage(error.message)
                setStatus('error')
            } else {
                setStatus('success')
            }
        } catch {
            setErrorMessage('An unexpected error occurred.')
            setStatus('error')
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-sm border-zinc-100 shadow-xl rounded-3xl p-4">
                <CardHeader className="text-center space-y-2 pb-2">
                    <div className="flex justify-center mb-2">
                        <Image src="/logo.png" alt="Pulse Agency" width={80} height={80} className="object-contain" />
                    </div>
                    <CardDescription className="text-zinc-500 font-medium text-base">Reset your password</CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'success' ? (
                        <div className="text-center space-y-6 animate-in zoom-in duration-300">
                            <div className="flex justify-center">
                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Check your email</h3>
                                <p className="text-zinc-500 text-sm">We&apos;ve sent a password reset link to <br/> <strong className="text-zinc-800">{email}</strong></p>
                            </div>
                            <Button asChild variant="outline" className="w-full h-12 rounded-2xl">
                                <Link href="/login">Return to log in</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-6">
                            {status === 'error' && (
                                <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {errorMessage}
                                </div>
                            )}

                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-sm font-semibold text-zinc-700 ml-1">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>

                            <div className="text-center pt-2">
                                <Link href="/login" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-800 transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to log in
                                </Link>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
