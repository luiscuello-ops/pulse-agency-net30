'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { usePathname } from 'next/navigation'

export function PortalNavbar() {
    const pathname = usePathname()

    const navLinks = [
        { name: 'Dashboard', href: '/portal/dashboard' },
        { name: 'Credit Line', href: '/portal/dashboard' }, // Mapping both to dashboard for now as they represent the same core view
        { name: 'Payments', href: '/portal/payments' },
        { name: 'Settings', href: '/portal/settings' },
    ]

    return (
        <header className="flex justify-between items-center px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
            <div className="flex items-center gap-4 group">
                <Logo />
                <span className="text-xl font-black text-white tracking-widest uppercase italic group-hover:text-violet-400 transition-colors">
                    Pulse Agency <span className="text-violet-500">LLC</span>
                </span>
            </div>

            <nav className="hidden md:flex gap-10">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold tracking-wide transition-all hover:text-white ${isActive ? 'text-purple-400' : 'text-zinc-400'
                                }`}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="flex items-center gap-4">
                {/* User Profile / Logout Placeholder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 border border-white/20" />
            </div>
        </header>
    )
}
