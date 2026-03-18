import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Shield, BarChart3, Zap, LayoutDashboard, CheckCircle2, ArrowRight } from "lucide-react"

import { SiteFooter } from "@/components/ui/site-footer"
import { Logo } from "@/components/ui/logo"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#030014] text-white selection:bg-violet-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full animate-float-delayed" />
        <div className="absolute top-[20%] right-[10%] w-px h-px shadow-[0_0_100px_50px_rgba(139,92,246,0.1)]" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full border-b border-white/5 bg-black/40 backdrop-blur-xl md:rounded-2xl md:mt-6 md:px-12 transition-all">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center group cursor-pointer active:scale-95 transition-all w-fit">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-12 text-[12px] font-medium uppercase tracking-[0.2em]">
          <Link href="/login" className="text-zinc-500 hover:text-white transition-colors">Portal Login</Link>
          <Button asChild className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white border-0 rounded-xl px-8 shadow-lg shadow-violet-500/20 active:scale-95 transition-all">
            <Link href="/prequalify">Apply Now</Link>
          </Button>
        </nav>
      </header>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6">
        {/* Hero Section */}
        <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24 md:py-32 max-w-7xl mx-auto">
          <div className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-glow animate-in fade-in slide-in-from-bottom-8 duration-700">
              Construya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">Crédito Empresarial</span> <br />
              <span className="text-3xl md:text-4xl lg:text-5xl tracking-tight opacity-90">de Alto Impacto.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-medium italic leading-relaxed border-violet-500/30 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              Empoderamos a las empresas de EE.UU. con herramientas de reporte directo y líneas Net-terms dinámicas para un crecimiento exponencial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <Button size="lg" asChild className="bg-violet-600 text-white hover:bg-white hover:text-black rounded-xl px-12 h-16 text-lg font-black shadow-2xl active:scale-95 transition-all border-none">
                <Link href="/prequalify">Empezar Ahora</Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative group perspective-1000 animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative glass-card border-white/20 p-2 overflow-hidden transform hover-3d rotate-3 shadow-2xl shadow-violet-500/20">
              <div className="relative h-[450px] w-full items-center justify-center flex overflow-hidden">
                <Image
                  src="/entrepreneurs.png"
                  alt="Pulse Entrepreneurs"
                  fill
                  className="rounded-2xl object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Pulsing Score Badge */}
            <div className="absolute -top-10 -right-10 glass-card p-6 border-white/20 animate-float shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-xs font-black text-zinc-500 uppercase tracking-widest">Score Pulse</div>
                  <div className="text-2xl font-black text-white italic">820+</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Marquee */}
        <div className="relative w-full py-16 border-y border-white/5 bg-white/[0.01] mb-24">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <h2 className="text-center text-sm md:text-base font-bold text-white italic tracking-[0.5em] uppercase opacity-90">CONFIANZA CORPORATIVA INTEGRADA</h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#030014] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#030014] to-transparent z-10" />
            
            <div className="flex animate-marquee gap-32 items-center whitespace-nowrap">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-32 items-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <div className="relative w-48 h-12">
                    <Image src="/dnb-logo.svg" alt="Dun & Bradstreet" fill className="object-contain" />
                  </div>
                  <div className="relative w-48 h-12">
                    <Image src="/experian-logo.svg" alt="Experian" fill className="object-contain" />
                  </div>
                  <div className="relative w-48 h-12 invert">
                    <Image src="/equifax-logo.svg" alt="Equifax" fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section - The Core Engine */}
        <section id="features" className="py-24 border-y border-white/5">
          <div className="flex flex-col items-center mb-16 space-y-4 text-center">
            <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em]">The Core Engine</h2>
            <p className="text-3xl md:text-4xl font-black text-white italic tracking-tight uppercase">Tecnología de Crédito Superior</p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {[
              { title: "Construcción de Crédito", desc: "Establezca una base sólida con perfiles comerciales optimizados para los principales burós.", icon: Shield, color: "text-violet-400" },
              { title: "Reporte Multi-Buró", desc: "Sincronización directa con Dun & Bradstreet, Experian y Equifax Business.", icon: BarChart3, color: "text-blue-400" },
              { title: "Prequalificación Instantánea", desc: "Nuestro algoritmo analiza su elegibilidad en segundos sin afectar su puntaje.", icon: Zap, color: "text-purple-400" },
              { title: "Panel Inteligente", desc: "Visualice su progreso, gestione líneas de crédito y monitoree su salud financiera.", icon: LayoutDashboard, color: "text-indigo-400" },
            ].map((feature, idx) => (
              <div key={idx} className="group relative p-8 glass-card hover:bg-white/10 transition-all duration-500 cursor-default overflow-hidden hover-3d perspective-1000">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-600/10 blur-3xl rounded-full group-hover:bg-violet-600/20 transition-all duration-700" />
                <feature.icon className={`w-10 h-10 ${feature.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`} />
                <h3 className="text-xl font-black text-white italic tracking-tight mb-3 uppercase">{feature.title}</h3>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-20 border-t border-white/5">
            {[
              { val: "$450M+", label: "Capacidad de Crédito Activada", sub: "En líneas comerciales activas" },
              { val: "24-48h", label: "Tiempo Promedio de Aprobación", sub: "Procesamiento con IA" },
              { val: "12,000+", label: "Empresas en Crecimiento", sub: "B2B en todo EE.UU." },
              { val: "+30%", label: "Impacto en Score Interno", sub: "Promedio en primeros 90 días" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 group">
                <div className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter group-hover:text-violet-400 transition-colors duration-500">{stat.val}</div>
                <div className="text-[10px] font-black text-violet-500 uppercase tracking-[0.3em]">{stat.label}</div>
                <div className="text-xs text-zinc-500 font-medium italic opacity-60">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight">
                  Transforme Gastos en <br />
                  <span className="text-violet-500">Patrimonio Corporativo</span>
                </h2>
                <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                  Deje de comprar en cosas que no necesita. Invierta en el marketing que hace crecer su negocio hoy, mientras construye un perfil crediticio imparable con beneficios Net-15 y Net-30.
                </p>
              </div>
              <div className="space-y-8">
                {[
                  { num: "01", title: "Inversión Inteligente", desc: "Active el crecimiento de su empresa con estrategias de marketing que generan ROI real desde el primer día." },
                  { num: "02", title: "Apalancamiento Net-30", desc: "Gestione su flujo de caja con beneficios Net-15 y Net-30, comprando tiempo y libertad para escalar." },
                  { num: "03", title: "Activo Crediticio Vivo", desc: "Cada inversión reporta a los burós comerciales, convirtiendo su presupuesto de marketing en poder financiero." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <span className="text-3xl font-black text-violet-500/20 group-hover:text-violet-500 transition-colors duration-500">{item.num}</span>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black italic uppercase text-zinc-200">{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group w-full lg:max-w-md mx-auto">
              <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
              <div className="relative group w-full h-full min-h-[400px] overflow-hidden rounded-[2rem] glass-card border-white/20">
                <div className="absolute inset-0 items-center justify-center flex overflow-hidden">
                  <Image
                    src="/success-tech.png"
                    alt="Success Tech Entrepreneurs"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                  <div className="flex justify-end items-start">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                      <CheckCircle2 className="w-6 h-6 text-violet-400" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">Aprobación <br /><span className="text-violet-400">Garantizada</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 relative overflow-hidden rounded-[2.5rem] mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/20 to-indigo-600/20" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
          <div className="relative z-10 text-center space-y-8 py-10 px-4">
            <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase max-w-3xl mx-auto leading-tight">
              ¿Listo para <span className="text-white underline decoration-violet-500 underline-offset-4">dominar su industria</span> <br className="hidden md:block" />
              con el respaldo financiero que su visión merece?
            </h2>
            <div className="flex justify-center">
              <Button size="lg" asChild className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 h-14 text-base font-black shadow-xl shadow-violet-500/30 active:scale-95 transition-all flex items-center gap-2">
                <Link href="/prequalify">
                  Empezar Aplicación <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
