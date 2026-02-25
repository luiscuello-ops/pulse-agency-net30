import { Button } from "@/components/ui/button"
import Link from "next/link"

import { SiteFooter } from "@/components/ui/site-footer"
import { TrustBadges } from "@/components/ui/trust-badges"
import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#030014] text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto w-full border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xl font-black text-white tracking-widest uppercase italic">
            Pulse Agency <span className="text-violet-500">LLC</span>
          </span>
        </div>
        <nav className="flex items-center space-x-8 text-xs font-black uppercase tracking-widest">
          <Link href="/portal/dashboard" className="text-zinc-500 hover:text-white transition-colors">Portal Login</Link>
          <Button asChild className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white rounded-xl px-8 shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
            <Link href="/prequalify">Apply Now</Link>
          </Button>
        </nav>
      </header>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6">
        <section className="flex flex-col items-center justify-center text-center space-y-12 py-32 md:py-48 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              Pulse Pro v2.0 Live
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
              Construya<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">Crédito Empresarial REAL</span> <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">en Estados Unidos.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl font-medium italic opacity-80 mx-auto leading-relaxed">
              Reporte a los 3 Burós desde sus primeras operaciones. Prequalificaciones en tiempo real, líneas Net terms dinámicas y tableros de alto impacto.
            </p>
          </div>

          <div className="flex justify-center pt-4 w-full max-w-lg mx-auto">
            <Button size="lg" asChild className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white rounded-xl px-10 h-14 text-lg font-black shadow-xl shadow-violet-500/25 active:scale-95 transition-all">
              <Link href="/prequalify">Empiece Aquí</Link>
            </Button>
          </div>
        </section>

        <section className="pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-2">Social Proof</h2>
              <p className="text-2xl font-black text-white italic tracking-tight">Confianza Corporativa Integrada</p>
            </div>
            <TrustBadges />
          </div>
        </section>
      </div >

      <div className="max-w-7xl mx-auto w-full px-6 mb-20">
      </div>

      <SiteFooter />
    </main >
  )
}
