'use client'

import { useState, useEffect } from 'react'
import { User, Settings, Shield, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createPortalBrowserClient } from '@/lib/supabase/client'

type Profile = {
    id: string
    company_name?: string
    subscription_status?: string
    email?: string
    phone?: string
    credit_limit?: number
    credit_balance?: number
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('Profile')
    const [profile, setProfile] = useState<Profile | null>(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const supabase = createPortalBrowserClient()


    useEffect(() => {
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            const { data } = await supabase
                .from('customers')
                .select('*')
                .eq('user_id', user.id)
                .single()
            setProfile(data)
            setEmail(data?.email || user.email || '')
            setPhone(data?.phone || '')
        }
        load()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        if (profile?.id) {
            await supabase.from('customers').update({ email, phone }).eq('id', profile.id)
        }
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const tabs = [
        { name: 'Profile', icon: User },
        { name: 'Business', icon: Shield },
        { name: 'Notifications', icon: Bell },
        { name: 'Security', icon: Settings },
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 min-h-screen">
            <header className="space-y-1">
                <h1 className="text-4xl font-black text-white tracking-tight">Settings</h1>
                <p className="text-zinc-500 font-medium italic">
                    Configure your <span className="text-violet-400">{profile?.company_name || 'Pulse Agency LLC'}</span> business profile.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-2">
                    {tabs.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold tracking-tight transition-all ${activeTab === item.name ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-8">

                    {/* PROFILE TAB */}
                    {activeTab === 'Profile' && (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                            <h2 className="text-2xl font-black text-white tracking-tight mb-10">Company Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Company Name</Label>
                                    <Input value={profile?.company_name || ''} disabled className="cosmic-input py-6 text-white font-black opacity-60" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Account Status</Label>
                                    <Input value={profile?.subscription_status === 'active' ? 'Active — Professional' : 'Free Tier'} disabled className={`cosmic-input py-6 font-black opacity-70 ${profile?.subscription_status === 'active' ? 'text-green-400' : 'text-amber-400'}`} />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Email for Receipts</Label>
                                    <Input value={email} onChange={e => setEmail(e.target.value)} className="cosmic-input py-6 text-white font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Support Phone</Label>
                                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="cosmic-input py-6 text-white font-bold" />
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-4 items-center">
                                {saved && <span className="text-xs text-green-400 font-black uppercase tracking-widest animate-pulse">Saved ✓</span>}
                                <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-black h-12 px-10 rounded-xl shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* BUSINESS TAB */}
                    {activeTab === 'Business' && (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                            <h2 className="text-2xl font-black text-white tracking-tight mb-10">Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Business Type</Label>
                                    <Input value="Corporation (LLC)" disabled className="cosmic-input py-6 text-white font-black opacity-50" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Registration Status</Label>
                                    <Input value="Active" disabled className="cosmic-input py-6 text-green-400 font-black opacity-70" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Credit Limit</Label>
                                    <Input value={profile?.credit_limit != null ? `$${profile.credit_limit.toLocaleString()}` : '—'} disabled className="cosmic-input py-6 text-violet-400 font-black opacity-70" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Current Balance</Label>
                                    <Input value={profile?.credit_balance != null ? `$${profile.credit_balance.toLocaleString()}` : '—'} disabled className="cosmic-input py-6 text-amber-400 font-black opacity-70" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS TAB */}
                    {activeTab === 'Notifications' && (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                            <h2 className="text-2xl font-black text-white tracking-tight mb-10">Notification Preferences</h2>
                            <div className="space-y-6">
                                {[
                                    { label: 'Payment Due Reminders', desc: 'Receive alerts 7 and 3 days before a payment is due.' },
                                    { label: 'Credit Bureau Reports', desc: 'Be notified when a new report is submitted to Dun & Bradstreet, Experian, or Equifax.' },
                                    { label: 'Approval Updates', desc: 'Get notified in real time when your credit line status changes.' },
                                    { label: 'Promotions & Upgrades', desc: 'Receive offers for increased credit lines and partner incentives.' },
                                ].map(n => (
                                    <div key={n.label} className="flex items-start justify-between gap-6 py-4 border-b border-white/5 last:border-0">
                                        <div>
                                            <p className="text-sm font-black text-white tracking-tight">{n.label}</p>
                                            <p className="text-xs text-zinc-500 font-medium mt-1">{n.desc}</p>
                                        </div>
                                        <div className="flex gap-3 items-center shrink-0">
                                            <button className="px-4 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[10px] font-black uppercase tracking-widest hover:bg-violet-600/40 transition-all">Email</button>
                                            <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">SMS</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECURITY TAB */}
                    {activeTab === 'Security' && (
                        <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30" />
                            <h2 className="text-2xl font-black text-white tracking-tight mb-10">Security Settings</h2>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">New Password</Label>
                                    <Input type="password" placeholder="••••••••••" className="cosmic-input py-6 text-white font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Confirm New Password</Label>
                                    <Input type="password" placeholder="••••••••••" className="cosmic-input py-6 text-white font-bold" />
                                </div>
                                <div className="pt-4">
                                    <Button className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-black h-12 px-10 rounded-xl shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-12 p-10 rounded-3xl border border-red-500/10 bg-red-500/5 space-y-6">
                                <h3 className="text-lg font-black text-red-400 tracking-tight">Danger Zone</h3>
                                <p className="text-sm text-zinc-500 font-medium">Permanently delete your business credit line data from the Pulse Engine.</p>
                                <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10 font-black h-12 px-8 rounded-xl">
                                    Request Closure
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
