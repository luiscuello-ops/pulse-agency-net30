'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/schemas'
import { createPortalBrowserClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createPortalBrowserClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (signInError) {
                setError(signInError.message)
                return
            }

            router.push('/portal/dashboard')
            router.refresh()
        } catch {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-sm border-zinc-100 shadow-xl rounded-3xl p-4">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-black tracking-tight text-violet-600 italic">PULSE</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium text-base">Sign in to your portal</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-semibold text-zinc-700 ml-1">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                {...register('email')}
                                className={`h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all ${errors.email ? 'border-red-500 bg-red-50/20' : ''}`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" title="Password" className="text-sm font-semibold text-zinc-700 ml-1">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={`h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all ${errors.password ? 'border-red-500 bg-red-50/20' : ''}`}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <div className="text-center text-sm text-zinc-500 pt-2">
                            Need an account?{" "}
                            <Link href="/signup" className="text-violet-600 font-bold hover:underline">
                                Sign up now
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
