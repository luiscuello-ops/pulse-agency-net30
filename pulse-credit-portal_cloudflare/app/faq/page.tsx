import { SiteFooter } from "@/components/ui/site-footer";

const FAQ = [
    {
        q: "¿Qué es Net-15 y Net-30?",
        a: "Son términos de pago empresariales: Net-15 vence a los 15 días y Net-30 a los 30 días desde la emisión (o prestación) indicada en la factura."
    },
    {
        q: "¿Cómo solicito precalificación?",
        a: "Completa el formulario de precalificación en la primera página. Luego verificamos identidad comercial y elegibilidad."
    },
    {
        q: "¿Qué datos necesito para registrarme?",
        a: "Nombre de la empresa, EIN, dirección comercial, email corporativo, teléfono y datos del contacto autorizado."
    },
    {
        q: "¿Reportan a Dun & Bradstreet, Experian y Equifax?",
        a: "Podemos reportar cuando aplique, sujeto a elegibilidad, verificación y condiciones del programa. El reporte y su impacto pueden variar."
    },
    {
        q: "¿Cuánto tarda el reporte?",
        a: "Depende del programa y del ciclo de facturación. En general, puede reflejarse en ciclos posteriores al pago y cierre de periodo."
    },
    {
        q: "¿Qué pasa si pago tarde?",
        a: "Puede suspenderse el acceso a términos netos, aplicarse medidas de cobro y, cuando corresponda, reflejarse el comportamiento de pago."
    },
    {
        q: "¿Cómo pago mi factura?",
        a: "Puedes pagar desde el portal con tarjeta o método disponible. Los pagos se procesan de forma segura mediante Stripe."
    },
    {
        q: "¿Puedo disputar un cargo o factura?",
        a: "Sí. Contáctanos con el número de factura y evidencia a support@pulseagency.llc dentro de un plazo razonable desde la emisión."
    },
    {
        q: "¿Guardan mis datos de tarjeta?",
        a: "No almacenamos tarjetas completas. El procesador (Stripe) gestiona la información de pago según sus políticas."
    },
    {
        q: "¿Cómo actualizo datos de mi empresa?",
        a: "Desde Settings en el portal o solicitándolo a soporte. Algunas modificaciones requieren verificación adicional."
    }
];

export default function FAQPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
            <h1 className="text-5xl font-black text-white tracking-tighter">Preguntas Frecuentes (FAQ)</h1>
            <p className="mt-4 text-zinc-400 font-medium italic">Respuestas rápidas sobre precalificación, términos netos, pagos y reporte.</p>

            <div className="mt-12 space-y-6">
                {FAQ.map((item) => (
                    <details key={item.q} className="glass-card group p-0 overflow-hidden border-white/5 transition-all">
                        <summary className="list-none cursor-pointer p-8 flex items-center justify-between text-xl font-black text-white tracking-tight italic select-none">
                            {item.q}
                            <span className="text-violet-500 transition-transform group-open:rotate-180">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </summary>
                        <div className="px-8 pb-8 pt-0">
                            <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                                {item.a}
                            </p>
                        </div>
                    </details>
                ))}
            </div>

            <SiteFooter />
        </main>
    );
}
