import { redirect } from 'next/navigation'
import { createPortalServerClient } from '@/lib/supabase/server'
import { Badge } from "@/components/ui/badge"
import { CreditUtilizationGauge } from "@/components/portal/credit-utilization-gauge"
import { AdvancePaymentCard } from "@/components/portal/payment-card"
import { RecentInvoices } from "@/components/portal/recent-invoices"
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = createPortalServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile and invoices
    const { data: profile } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id)
        .single()

    const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', profile?.id)
        .order('created_at', { ascending: false })

    const isActive = profile?.subscription_status === 'active'

    // Calculate dynamic balances from mirrored Wave invoices
    let currentBalanceCents = 0;
    let nextPaymentDate: string | null = null;

    if (invoices) {
        for (const inv of invoices) {
            if (inv.status !== 'PAID' && inv.status !== 'DRAFT') {
                currentBalanceCents += inv.amount_cents || 0;
                if (inv.due_date && (!nextPaymentDate || new Date(inv.due_date) < new Date(nextPaymentDate))) {
                    nextPaymentDate = inv.due_date;
                }
            }
        }
    }

    const currentBalance = currentBalanceCents / 100;
    const totalLimit = isActive ? (profile?.credit_limit || 500) : 0;
    const availableCredit = Math.max(0, totalLimit - currentBalance);
    const utilization = totalLimit > 0 ? (currentBalance / totalLimit) * 100 : 0;
    
    // Format helpers
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString: string | null) => dateString ? new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 min-h-screen">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">{profile?.company_name || 'to Pulse'}</span>
                        </h1>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">In Good Standing</span>
                        </div>
                    </div>
                    <p className="text-lg text-zinc-400 font-medium italic opacity-70">Pulse Engine Control Center — System Status: <span className="text-violet-400 not-italic font-bold">Operational</span></p>
                </div>
                <div className="flex gap-4 items-center">
                    <Badge variant="outline" className={`px-6 py-2.5 rounded-full text-[10px] font-black shadow-xl backdrop-blur-md tracking-[0.2em] border-white/10 ${isActive ? 'bg-violet-500/10 text-violet-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {isActive ? 'PROFESSIONAL ACCESS' : 'FREE TIER'}
                    </Badge>
                </div>
            </header>

            <main className="w-full space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                    {/* Gauge Section */}
                    <div className="lg:col-span-3 glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden group border-white/5 transition-all hover:shadow-purple-500/10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />

                        <div className="flex w-full items-center justify-between mb-10">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-white tracking-tight">Credit Line Utilization</h2>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none">Live Pulse Tracking</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Approved Limit</p>
                                <p className="text-3xl font-black text-white tracking-tight leading-none">{formatCurrency(totalLimit)}</p>
                            </div>
                        </div>

                        <CreditUtilizationGauge
                            percentage={utilization}
                            subLabel={utilization > 80 ? "Critical" : utilization > 50 ? "Moderate" : "Optimal"}
                            label="Utilization"
                        />

                        <div className="mt-12 w-full grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group-hover:border-violet-500/20 transition-all">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">RT LEVEL</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-2xl font-black text-green-400 tracking-tight">Optimal</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group-hover:border-violet-500/20 transition-all text-right">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Pulse Risk Score</p>
                                <p className="text-3xl font-black text-white tracking-tight leading-none italic">82</p>
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-white/10 rounded-full px-6 py-2 inline-block">Next Payment Due: {formatDate(nextPaymentDate)}</p>
                        </div>
                    </div>

                    {/* Advance Payment Section */}
                    <div className="lg:col-span-2">
                        <AdvancePaymentCard />
                    </div>
                </div>

                {/* Summary Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card p-10 border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-all cursor-default">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Available Credit</p>
                            <p className="text-4xl font-black text-white tracking-tighter leading-none">{formatCurrency(availableCredit)}</p>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Total Credit Line</p>
                        </div>
                        <CheckCircle2 className="w-12 h-12 text-green-500/20 group-hover:text-green-500/40 transition-all" />
                    </div>
                    <div className="glass-card p-10 border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-all cursor-default">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Current Balance</p>
                            <p className="text-4xl font-black text-white tracking-tighter leading-none">{formatCurrency(currentBalance)}</p>
                            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Due: {formatDate(nextPaymentDate)}</p>
                        </div>
                        <AlertCircle className="w-12 h-12 text-amber-500/20 group-hover:text-amber-500/40 transition-all" />
                    </div>
                    <div className="glass-card p-10 border-white/5 flex items-center justify-between group hover:border-violet-500/30 transition-all cursor-default">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Next Payment Due</p>
                            <p className="text-4xl font-black text-white tracking-tighter leading-none">{formatCurrency(currentBalance)}</p>
                            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Auto-Pay Enabled</p>
                        </div>
                        <Clock className="w-12 h-12 text-violet-500/20 group-hover:text-violet-500/40 transition-all" />
                    </div>
                </div>

                <div className="mt-12">
                    <RecentInvoices invoices={invoices || []} />
                </div>
            </main>
        </div>
    )
}

