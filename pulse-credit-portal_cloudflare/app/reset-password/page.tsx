'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortalBrowserClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [sessionChecked, setSessionChecked] = useState(false)
    const supabase = createPortalBrowserClient()

    useEffect(() => {
        // Since Supabase sets the session automatically from the URL hash, we just wait briefly for it to be ready.
        // We can check if a session exists to ensure they clicked a valid link.
        const checkSession = async () => {
             const { data: { session } } = await supabase.auth.getSession()
             if (!session) {
                 // Try parsing hash if available (sometimes getSession is too fast)
                 const hash = window.location.hash
                 if (!hash || !hash.includes('access_token')) {
                     setErrorMessage('Invalid or expired password reset link. Please try requesting a new one.')
                     setStatus('error')
                 }
             }
             setSessionChecked(true)
        }
        
        checkSession()
        
        // Setup listener for auth state changes just in case the URL processing takes an extra ms
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
             if (event === 'PASSWORD_RECOVERY' || session) {
                 // Clean state, ready to reset
                 setStatus('idle')
                 setErrorMessage('')
             }
        })
        
        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.')
            setStatus('error')
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            setStatus('error')
            return
        }

        setStatus('loading')
        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) {
                setErrorMessage(error.message)
                setStatus('error')
            } else {
                setStatus('success')
                // Wait 2 seconds before redirecting to dashboard or login
                setTimeout(() => {
                    router.push('/portal/dashboard')
                    router.refresh()
                }, 2000)
            }
        } catch {
            setErrorMessage('An unexpected error occurred.')
            setStatus('error')
        }
    }

    if (!sessionChecked) {
        return (
            <div className="container mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-sm border-zinc-100 shadow-xl rounded-3xl p-4">
                <CardHeader className="text-center space-y-2 pb-2">
                    <div className="flex justify-center mb-2">
                        <Image src="/logo.png" alt="Pulse Agency" width={80} height={80} className="object-contain" />
                    </div>
                    <CardDescription className="text-zinc-500 font-medium text-base">Create new password</CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'success' ? (
                        <div className="text-center space-y-6 animate-in zoom-in duration-300">
                            <div className="flex justify-center">
                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Password Updated</h3>
                                <p className="text-zinc-500 text-sm">Your password has been changed successfully. Redirecting you to the portal...</p>
                            </div>
                            <Button asChild variant="outline" className="w-full h-12 rounded-2xl">
                                <Link href="/portal/dashboard">Go to Dashboard</Link>
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-6">
                            {status === 'error' && (
                                <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div className="flex flex-col">
                                        <span>{errorMessage}</span>
                                        {errorMessage.includes('expired') && (
                                            <Link href="/forgot-password" className="font-bold underline mt-1">Request new link</Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-semibold text-zinc-700 ml-1">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-zinc-700 ml-1">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200"
                                disabled={status === 'loading' || status === 'error'}
                            >
                                {status === 'loading' ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
                                ) : (
                                    <><KeyRound className="mr-2 h-5 w-5" /> Update Password</>
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
