import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
    const companyName = "Pulse Agency LLC";
    const address = "30 N Gould St, Sheridan, WY 82801";
    const phone = "+1 307 4293264";
    const email = "info@pulseagencyusa.com";

    return (
        <footer id="contact" className="relative z-10 py-24 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 items-start">
                    {/* Brand & Address */}
                    <div className="space-y-8 flex flex-col items-start">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center group cursor-pointer active:scale-95 transition-all w-fit">
                                <Logo />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 text-zinc-400 font-medium italic text-sm">
                            <p className="hover:text-white transition-colors cursor-default leading-tight">{address}</p>
                            <p className="hover:text-white transition-colors cursor-default leading-tight">Tel: {phone}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8 flex flex-col items-start px-0 lg:px-4">
                        <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] h-6 flex items-center">Platform</h4>
                        <div className="flex flex-col gap-3 font-bold text-zinc-500 uppercase tracking-widest text-xs">
                            <Link className="hover:text-violet-400 transition-colors" href="/login">Portal Login</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/prequalify">Apply Now</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="#features">Pricing</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="#solutions">Solutions</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-8 flex flex-col items-start px-0 lg:px-4">
                        <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] h-6 flex items-center">Legal</h4>
                        <div className="flex flex-col gap-3 font-bold text-zinc-500 uppercase tracking-widest text-xs">
                            <Link className="hover:text-violet-400 transition-colors" href="/terms">Terms & Conditions</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/privacy">Privacy Policy</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/faq">FAQ</Link>
                        </div>
                    </div>

                    {/* Contact & Trust */}
                    <div className="space-y-8 flex flex-col items-start px-0 lg:px-4">
                        <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] h-6 flex items-center">Support</h4>
                        <div className="flex flex-col gap-4">
                            <p className="font-bold text-zinc-300 uppercase tracking-widest text-xs italic">{email}</p>
                            <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-wider max-w-[240px]">
                                Payments processed securely via <span className="text-zinc-300">Stripe</span>. Credit reporting (when applicable) performed through <br className="hidden lg:block" /> commercial bureaus.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        <span>Built for B2B Industry</span>
                        <span className="text-violet-500/50">•</span>
                        <span>Net-15 / Net-30 Specialist</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">Pulse Engine Status: Optimal</span>
                    </div>
                </div>

                {/* Bottom copyright bar */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm font-black text-zinc-500 uppercase tracking-widest italic opacity-60">
                        © 2026 {companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
