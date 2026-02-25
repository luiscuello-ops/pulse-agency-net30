import { History, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentsPage() {
    // This will be a server component eventually, but for now mocked UI

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 min-h-screen">
            <header className="flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-white tracking-tight">Payments & Ledger</h1>
                    <p className="text-zinc-500 font-medium italic">Manage your credit line payments and transaction history.</p>
                </div>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
                    <Plus className="w-5 h-5 mr-2" /> New Payment
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-1 glass-card p-10 space-y-8 relative overflow-hidden group border-white/5">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Outstanding</p>
                        <h2 className="text-5xl font-black text-white tracking-tighter">$720.00</h2>
                    </div>
                    <div className="pt-4 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500 font-bold">Next Payment Due</span>
                            <span className="text-white font-black">Mar 30, 2026</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500 font-bold">Minimum Amount</span>
                            <span className="text-white font-black">$216.00</span>
                        </div>
                    </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2 glass-card border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                            <History className="w-5 h-5 text-violet-400" /> Recent Transactions
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-zinc-500 font-black italic">
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Description</th>
                                    <th className="px-8 py-6 text-right">Amount</th>
                                    <th className="px-8 py-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-6 text-zinc-400 font-bold">Feb 15, 2026</td>
                                    <td className="px-8 py-6 text-white font-blackitalic">Stripe Payout - Credit Extension</td>
                                    <td className="px-8 py-6 text-right text-white font-black">+$1,500.00</td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">Cleared</span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-6 text-zinc-400 font-bold">Feb 01, 2026</td>
                                    <td className="px-8 py-6 text-white font-black italic">Monthly Interest Charge</td>
                                    <td className="px-8 py-6 text-right text-red-400 font-black">-$12.00</td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="px-3 py-1 bg-white/5 text-zinc-500 rounded-full text-[10px] font-black tracking-widest uppercase">Posted</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
