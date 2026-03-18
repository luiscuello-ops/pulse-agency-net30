'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPortalBrowserClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, Loader2 } from 'lucide-react'

const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    companyName: z.string().min(2, 'Company name is required'),
    ein: z.string().min(9, 'Valid EIN is required'),
    corporateEmail: z.string().email('Invalid corporate email'),
    phone: z.string().min(10, 'Valid phone number is required'),
    website: z.string().optional(),
})

type SignupInput = z.infer<typeof signupSchema>

export default function SignupPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createPortalBrowserClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    })

    const onSubmit = async (data: SignupInput) => {
        setIsLoading(true)
        setError(null)

        try {
            // 1. Create Auth User
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            })

            if (signUpError) {
                setError(signUpError.message)
                return
            }

            if (authData.user) {
                // 2. Insert into customers table with user_id = auth.uid()
                const { error: dbError } = await supabase
                    .from('customers')
                    .insert({
                        user_id: authData.user.id,
                        company_name: data.companyName,
                        ein: data.ein,
                        corporate_email: data.corporateEmail,
                        phone: data.phone,
                        website: data.website,
                    })

                if (dbError) {
                    console.error('Database insertion error:', dbError)
                }

                router.push('/portal/dashboard')
                router.refresh()
            }
        } catch {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-2xl border-zinc-100 shadow-xl rounded-3xl p-4">
                <CardHeader className="text-center space-y-2 pb-2">
                    <div className="flex justify-center mb-2">
                        <Image src="/logo.png" alt="Pulse Agency" width={80} height={80} className="object-contain" />
                    </div>
                    <CardDescription className="text-zinc-500 font-medium text-base">Create your business account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Account Credentials</h3>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-sm font-semibold text-zinc-700 ml-1">Account Email</Label>
                                    <Input id="email" type="email" placeholder="admin@company.com" {...register('email')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                    {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="password" title="Password" className="text-sm font-semibold text-zinc-700 ml-1">Password</Label>
                                    <Input id="password" type="password" {...register('password')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                    {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">Business Details</h3>
                                <div className="space-y-3">
                                    <Label htmlFor="companyName" className="text-sm font-semibold text-zinc-700 ml-1">Company Name</Label>
                                    <Input id="companyName" placeholder="Pulse Agency LLC" {...register('companyName')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                    {errors.companyName && <p className="text-xs text-red-500 ml-1">{errors.companyName.message}</p>}
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="ein" className="text-sm font-semibold text-zinc-700 ml-1">EIN</Label>
                                    <Input id="ein" placeholder="00-0000000" {...register('ein')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                    {errors.ein && <p className="text-xs text-red-500 ml-1">{errors.ein.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="corporateEmail" className="text-sm font-semibold text-zinc-700 ml-1">Corporate Email</Label>
                                <Input id="corporateEmail" type="email" placeholder="billing@company.com" {...register('corporateEmail')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                {errors.corporateEmail && <p className="text-xs text-red-500 ml-1">{errors.corporateEmail.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-sm font-semibold text-zinc-700 ml-1">Phone Number</Label>
                                <Input id="phone" placeholder="+1 (555) 000-0000" {...register('phone')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="website" className="text-sm font-semibold text-zinc-700 ml-1">Website (Optional)</Label>
                                <Input id="website" placeholder="https://company.com" {...register('website')} className="h-12 rounded-2xl bg-zinc-50 border-transparent focus:bg-white transition-all" />
                                {errors.website && <p className="text-xs text-red-500 ml-1">{errors.website.message}</p>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Complete Business Registration'
                            )}
                        </Button>
                        <div className="text-center text-sm text-zinc-500">
                            Already have a business account?{" "}
                            <Link href="/login" className="text-violet-600 font-bold hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
