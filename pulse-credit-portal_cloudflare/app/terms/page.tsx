import { SiteFooter } from "@/components/ui/site-footer";

export default function TermsPage() {
    const companyName = "Pulse Agency LLC";
    const supportEmail = "support@pulseagency.llc";
    const companyAddress = "30 N Gould St, Sheridan, WY 82801";

    return (
        <main className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
            <h1 className="text-5xl font-black text-white tracking-tighter">Términos y Condiciones</h1>
            <p className="mt-4 text-zinc-400 font-medium italic">Última actualización: 2026-01-01</p>

            <section className="mt-12 space-y-10 text-zinc-300 leading-relaxed text-lg">
                <p>
                    Estos Términos y Condiciones (“Términos”) rigen el uso del sitio y servicios de <b>{companyName}</b>. Al acceder o utilizar los Servicios,
                    usted acepta estos Términos.
                </p>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">1. Elegibilidad</h2>
                    <p>
                        Los Servicios están destinados a clientes B2B. Usted declara que actúa en representación de una entidad comercial con capacidad legal.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">2. Cuenta y verificación</h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Debe proporcionar información verdadera y actualizada.</li>
                        <li>Podemos solicitar verificación empresarial (por ejemplo, EIN, dominio, documentos).</li>
                        <li>Usted es responsable de mantener la confidencialidad de sus credenciales.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">3. Términos de pago (Net-15 / Net-30)</h2>
                    <p>
                        Si se aprueban términos netos, las facturas deberán pagarse en la fecha de vencimiento indicada. Pagos tardíos pueden derivar en:
                        suspensión del servicio, cargos por mora si corresponde, o acciones de cobro permitidas por ley.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">4. Pagos y procesadores (Stripe)</h2>
                    <p>
                        Los pagos pueden ser procesados por Stripe u otros proveedores. Usted acepta las condiciones del procesador aplicable. No garantizamos
                        disponibilidad continua de pasarelas de pago.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">5. Reporte a agencias de crédito comercial</h2>
                    <p>
                        Cuando aplique, y sujeto a verificación/elegibilidad, podemos reportar comportamiento de pago o historial comercial a agencias de crédito
                        empresarial (por ejemplo, Dun & Bradstreet, Experian Business, Equifax Business). No garantizamos resultados específicos en puntajes.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">6. Uso aceptable</h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>No usar el Servicio para fraude, suplantación, ingeniería inversa o abuso.</li>
                        <li>No interferir con la seguridad, integridad o disponibilidad del sistema.</li>
                        <li>No cargar contenido ilegal o que viole derechos de terceros.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">7. Propiedad intelectual</h2>
                    <p>
                        Todo el contenido, software, diseños, marcas y materiales pertenecen a <b>{companyName}</b> o sus licenciantes, salvo indicación contraria.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">8. Limitación de responsabilidad</h2>
                    <p>
                        En la máxima medida permitida por ley, <b>{companyName}</b> no será responsable por daños indirectos, incidentales, pérdida de datos,
                        pérdida de ingresos o interrupción del negocio derivados del uso del Servicio.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">9. Terminación</h2>
                    <p>
                        Podemos suspender o terminar el acceso si se violan estos Términos, por riesgo de fraude, o por obligación legal.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">10. Ley aplicable y contacto</h2>
                    <p className="not-italic">
                        Para dudas o reclamos: <span className="text-violet-400">{supportEmail}</span><br />
                        <b className="text-white">{companyName}</b> · {companyAddress} · Tel: +1 307 4293264
                    </p>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
