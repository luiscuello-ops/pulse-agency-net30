'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { usePathname, useRouter } from 'next/navigation'
import { createPortalBrowserClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { LogOut, Loader2 } from 'lucide-react'

export function PortalNavbar() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createPortalBrowserClient()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const navLinks = [
        { name: 'Dashboard', href: '/portal/dashboard' },
        { name: 'Credit Line', href: '/portal/dashboard' },
        { name: 'Payments', href: '/portal/payments' },
        { name: 'Settings', href: '/portal/settings' },
    ]

    const handleSignOut = async () => {
        setIsSigningOut(true)
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <header className="flex justify-between items-center px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
            <div className="flex items-center group">
                <Logo />
            </div>

            <nav className="hidden md:flex gap-10">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold tracking-wide transition-all hover:text-white ${isActive ? 'text-purple-400' : 'text-zinc-400'}`}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    title="Sign Out"
                    className="relative w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 border border-white/20 flex items-center justify-center hover:from-red-500 hover:to-rose-500 hover:border-red-500/40 transition-all duration-300 group shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95"
                    aria-label="Sign out"
                >
                    {isSigningOut ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                        <LogOut className="w-4 h-4 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                </button>
            </div>
        </header>
    )
}
