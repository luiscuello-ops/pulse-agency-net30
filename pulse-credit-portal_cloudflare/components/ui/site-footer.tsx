import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
    const companyName = "Pulse Agency LLC";
    const address = "30 N Gould St, Sheridan, WY 82801";
    const phone = "+1 307 4293264";
    const email = "support@pulseagency.llc";

    return (
        <footer className="mt-20 border-t border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-16 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand & Address */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Logo />
                            <span className="text-lg font-black text-white tracking-widest uppercase italic">
                                Pulse Agency <span className="text-violet-500">LLC</span>
                            </span>
                        </div>
                        <div className="space-y-2 text-zinc-400 font-medium italic">
                            <p className="hover:text-white transition-colors cursor-default">{address}</p>
                            <p className="text-xs opacity-60 not-italic mt-4">Tel: {phone}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Platform</h4>
                        <div className="flex flex-col gap-3 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">
                            <Link className="hover:text-violet-400 transition-colors" href="/portal/dashboard">Portal Login</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/prequalify">Apply Now</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="#">Pricing</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="#">Solutions</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Legal</h4>
                        <div className="flex flex-col gap-3 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">
                            <Link className="hover:text-violet-400 transition-colors" href="/terms">Terms & Conditions</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/privacy">Privacy Policy</Link>
                            <Link className="hover:text-violet-400 transition-colors" href="/faq">FAQ</Link>
                        </div>
                    </div>

                    {/* Contact & Trust */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Support</h4>
                        <div className="space-y-4">
                            <p className="font-bold text-zinc-300 italic">{email}</p>
                            <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                                Payments processed securely via <span className="text-zinc-300">Stripe</span>. Credit reporting (when applicable) performed through commercial bureaus.
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
