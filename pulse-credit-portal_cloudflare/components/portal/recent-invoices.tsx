'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronRight } from 'lucide-react'

interface RecentInvoicesProps {
    invoices: { id: string, created_at: string, amount_cents: number, status: string }[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
    return (
        <div className="glass-card overflow-hidden transition-all duration-500 hover:shadow-purple-500/10 border-white/5">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight text-white">Recent Invoices</h2>
                <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">View All &rarr;</button>
            </div>
            <div className="p-0">
                <Table className="w-full">
                    <TableHeader className="bg-white/2 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none h-14">
                            <TableHead className="pl-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Invoice</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Due Date</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Amount</TableHead>
                            <TableHead className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</TableHead>
                            <TableHead className="text-right pr-10 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices && invoices.length > 0 ? (
                            invoices.map((invoice: { id: string, created_at: string, amount_cents: number, status: string }) => (
                                <TableRow key={invoice.id} className="border-white/5 h-20 hover:bg-white/5 transition-all group">
                                    <TableCell className="pl-10 font-bold text-white tracking-tight">INV-{invoice.id.slice(0, 4).toUpperCase()}</TableCell>
                                    <TableCell className="text-zinc-400 font-medium text-sm">{new Date(invoice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</TableCell>
                                    <TableCell className="font-black text-white text-lg tracking-tighter">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.amount_cents / 100)}
                                    </TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${invoice.status === 'paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {invoice.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <button
                                            className={`inline-flex items-center gap-2 pl-6 pr-4 py-2 rounded-xl text-[10px] font-white transition-all duration-300 ${invoice.status === 'paid'
                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 font-black uppercase tracking-widest'
                                                : 'bg-green-600 hover:bg-green-500 font-black shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105 uppercase tracking-widest text-white'
                                                }`}
                                            onClick={() => window.location.href = '/portal/dashboard'}
                                        >
                                            {invoice.status === 'paid' ? 'Paid' : 'Pay Now'}
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center text-zinc-500 font-medium italic opacity-50">
                                    No recent activity found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="p-6 border-t border-white/5 bg-white/2 text-center">
                <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">View All Transaction History</button>
            </div>
        </div>
    )
}
