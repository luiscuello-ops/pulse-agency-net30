'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Loader2
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { GrowthChart } from '@/components/portal/growth-chart'
import { SiteFooter } from '@/components/ui/site-footer'

const prequalifySchema = z.object({
    firstName: z.string().min(2, 'Name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    companyName: z.string().min(2, 'Company name is required'),
    ein: z.string().regex(/^\d{2}-?\d{7}$/, 'Must be a valid EIN format (XX-XXXXXXX)'),
    income: z.string().min(1, 'Income is required'),
    debts: z.string().min(1, 'Debts are required'),
    creditInquiries: z.string().min(1, 'Inquiries count is required'),
})

type PrequalifyValues = z.infer<typeof prequalifySchema>

export default function PrequalifyPage() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<{ success: boolean; score?: number; creditLimit?: number } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<PrequalifyValues>({
        resolver: zodResolver(prequalifySchema),
    })

    const nextStep = () => setStep(2)
    const prevStep = () => setStep(1)

    const onSubmit = async (data: PrequalifyValues) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/prequalify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            setResult({ success: true, score: json.score, creditLimit: json.creditLimit })
        } catch {
            setResult({ success: false })
        } finally {
            setIsLoading(false)
        }
    }

    const steps = [
        { id: 1, label: 'Precalificación' },
        { id: 2, label: 'Análisis de Riesgo' },
        { id: 3, label: 'Aprobación + Depósito' },
        { id: 4, label: 'Reporte y Aumento' },
    ]

    if (result?.success) {
        return (
            <div className="container mx-auto py-24 px-6 max-w-4xl min-h-screen flex flex-col items-center justify-center">
                <div className="glass-card w-full p-16 text-center shadow-2xl border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
                    <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4">You&apos;re Pre-qualified!</h2>
                    <p className="text-xl text-zinc-400 font-medium italic mb-12 opacity-80">Based on our advanced Pulse Engine analysis, your business is eligible.</p>

                    <div className="inline-block relative mb-12">
                        <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
                        <div className="relative text-7xl font-black text-white tracking-tighter glow-text-purple italic">
                            ${result.creditLimit?.toLocaleString() || '500'}
                        </div>
                        <p className="text-xs font-black text-violet-400 uppercase tracking-[0.3em] mt-2">Approved Credit Limit</p>
                    </div>

                    <Separator className="bg-white/5 mb-12" />

                    <Button
                        size="lg"
                        asChild
                        className="w-full max-w-md mx-auto py-8 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] text-xl font-black h-auto active:scale-95"
                    >
                        <Link href={`/register?email=${encodeURIComponent(getValues('email'))}&score=${result.score}&limit=${result.creditLimit}&company=${encodeURIComponent(getValues('companyName'))}&ein=${encodeURIComponent(getValues('ein'))}`}>
                            Finalize Your Access Area
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-20 px-6 max-w-7xl min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Side: Branding, Hero & Chart */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-16">
                    {/* Header Branding */}
                    <div className="space-y-12">
                        <div className="flex items-center group">
                            <Logo />
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.8] max-w-3xl">
                            Crédito <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">Comercial</span> <br />
                            para B2B
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium italic max-w-xl opacity-80 leading-relaxed">
                            Construya historial crediticio empresarial mientras invierte en su crecimiento con IA y datos de alto impacto.
                        </p>
                    </div>

                    {/* Trust Logos */}
                    <div className="flex items-center gap-6 md:gap-10 opacity-70">
                        <div className="relative w-24 h-8 grayscale hover:grayscale-0 transition-all duration-500">
                            <Image src="/dnb-logo.svg" alt="Dun & Bradstreet" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 h-8 grayscale hover:grayscale-0 transition-all duration-500">
                            <Image src="/experian-logo.svg" alt="Experian Business" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 h-8 grayscale hover:grayscale-0 transition-all duration-500 invert">
                            <Image src="/equifax-logo.svg" alt="Equifax Business" fill className="object-contain" />
                        </div>
                    </div>

                    {/* Numerical Step Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-white/2 rounded-3xl border border-white/5">
                        {steps.map((s) => (
                            <div key={s.id} className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${step === s.id ? 'bg-violet-600/20 border border-violet-500/30' : 'opacity-40'}`}>
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${step === s.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50' : 'bg-white/10 text-zinc-500'}`}>
                                    {s.id}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${step === s.id ? 'text-white' : 'text-zinc-500'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <GrowthChart />
                </div>

                {/* Right Side: Form & Requirements */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                    {/* Requirements Sidebar */}
                    <div className="glass-card p-10 border-white/5 bg-violet-600/5 transition-all hover:bg-violet-600/10">
                        <h3 className="text-xl font-black text-white tracking-widest uppercase italic mb-8 border-b border-white/5 pb-4">Requisitos</h3>
                        <ul className="space-y-4">
                            {[
                                'Empresa B2B en EE.UU.',
                                'EIN válido del IRS',
                                'Compra mínima de $80',
                                'Analisis de Riesgo Pulse',
                                'Depósito Inicial 30%'
                            ].map((req) => (
                                <li key={req} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,1)]" />
                                    <span className="text-sm font-bold text-zinc-300 italic">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pre-qualification Form Wrap */}
                    <div className="glass-card p-10 relative overflow-hidden group border-white/5">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                        <div className="mb-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-black text-white tracking-tight">Prequalify</h2>
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Step {step} of 2</span>
                            </div>
                            <p className="text-sm text-zinc-500 font-medium italic">Empiece su camino al crédito empresarial moderno.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="firstName" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">First Name</Label>
                                            <Input id="firstName" placeholder="John" {...register('firstName')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.firstName && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="lastName" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" {...register('lastName')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.lastName && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" {...register('email')} className="cosmic-input py-6 text-lg font-bold" />
                                        {errors?.email && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.email.message}</p>}
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full py-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all shadow-lg shadow-violet-500/25 text-lg font-black h-auto active:scale-95"
                                    >
                                        Continuar <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="companyName" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Business Name</Label>
                                            <Input id="companyName" placeholder="Pulse Agency LLC" {...register('companyName')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.companyName && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.companyName.message}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="ein" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Valid IRS EIN</Label>
                                            <Input id="ein" placeholder="00-0000000" {...register('ein')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.ein && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.ein.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="income" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Monthly Income ($)</Label>
                                            <Input id="income" type="number" placeholder="5000" {...register('income')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.income && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.income.message}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="debts" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Monthly Expenses ($)</Label>
                                            <Input id="debts" type="number" placeholder="500" {...register('debts')} className="cosmic-input py-6 text-lg font-bold" />
                                            {errors?.debts && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.debts.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="creditInquiries" className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Recent Inquiries</Label>
                                        <Input id="creditInquiries" type="number" placeholder="0" {...register('creditInquiries')} className="cosmic-input py-6 text-lg font-bold" />
                                        {errors?.creditInquiries && <p className="text-xs text-red-400 font-bold ml-2 italic">{errors.creditInquiries.message}</p>}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={prevStep}
                                            className="px-6 py-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all text-xs font-black text-zinc-500 uppercase tracking-widest h-auto"
                                        >
                                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 transition-all shadow-lg shadow-violet-500/25 text-lg font-black h-auto active:scale-95"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Get My Score'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>


                    <div className="p-8 text-center bg-white/2 rounded-3xl border border-white/5 opacity-50">
                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] leading-loose">
                            Este programa no es crédito al consumidor.<br />Exclusivo para Empresas B2B registradas.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Brand Bar */}
            <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 pb-20 opacity-40">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">© 2026 Pulse Agency LLC</span>
                </div>
                <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors">Compliance</Link>
                </div>
            </div>

            <SiteFooter />
        </div>
    )
}
