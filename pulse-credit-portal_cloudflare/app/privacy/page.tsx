import { SiteFooter } from "@/components/ui/site-footer";

export default function PrivacyPage() {
    const companyName = "Pulse Agency LLC";
    const supportEmail = "support@pulseagency.llc";
    const companyAddress = "30 N Gould St, Sheridan, WY 82801";

    return (
        <main className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
            <h1 className="text-5xl font-black text-white tracking-tighter">Política de Privacidad</h1>
            <p className="mt-4 text-zinc-400 font-medium italic">Última actualización: 2026-01-01</p>

            <section className="mt-12 space-y-10 text-zinc-300 leading-relaxed text-lg">
                <p>
                    Esta Política de Privacidad describe cómo <b>{companyName}</b> (“nosotros”, “nuestro”) recopila, utiliza y protege la información
                    cuando usted visita o utiliza nuestro sitio web, portal y servicios (“Servicios”).
                </p>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">1. Información que recopilamos</h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li><b>Información de cuenta:</b> nombre, email corporativo, teléfono, empresa, EIN u otros datos de verificación empresarial.</li>
                        <li><b>Datos de transacciones:</b> facturas, montos, fechas, estado de pago, historial de actividad en el portal.</li>
                        <li><b>Datos técnicos:</b> IP, tipo de navegador, identificadores de dispositivo, registros de eventos, cookies.</li>
                        <li><b>Información de soporte:</b> comunicaciones, tickets, grabaciones o mensajes si usted nos contacta.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">2. Cómo usamos la información</h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Proveer y operar los Servicios (registro, acceso, facturación, pagos).</li>
                        <li>Verificación y prevención de fraude, seguridad y cumplimiento.</li>
                        <li>Atención al cliente y comunicaciones operativas.</li>
                        <li>Mejorar la experiencia del usuario, performance y UX.</li>
                        <li>Cuando corresponda, procesos vinculados a <b>reporte de comportamiento de pago</b> a agencias de crédito comercial.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">3. Pagos (Stripe)</h2>
                    <p>
                        Los pagos pueden ser procesados por terceros como Stripe. No almacenamos números completos de tarjetas. Stripe puede recopilar y procesar
                        información de pago según sus políticas.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">4. Compartición de información</h2>
                    <p>Podemos compartir información únicamente cuando sea necesario para:</p>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>Proveedores (hosting, analítica, email, CRM como HubSpot, pagos como Stripe).</li>
                        <li>Cumplimiento legal, solicitudes gubernamentales, auditorías.</li>
                        <li>Seguridad, prevención de fraude, y cumplimiento contractual.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">5. Retención</h2>
                    <p>
                        Conservamos información mientras sea necesaria para operar los Servicios, cumplir obligaciones legales, resolver disputas y hacer cumplir acuerdos.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">6. Cookies</h2>
                    <p>
                        Utilizamos cookies y tecnologías similares para autenticar sesiones, recordar preferencias y medir performance. Usted puede gestionar cookies desde su navegador.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">7. Seguridad</h2>
                    <p>
                        Aplicamos controles razonables (cifrado en tránsito, controles de acceso, registros). Sin embargo, ningún sistema es 100% infalible.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">8. Derechos del usuario</h2>
                    <p>
                        Puede solicitar acceso, corrección o eliminación de datos cuando aplique. Para solicitudes, contáctenos en <b>{supportEmail}</b>.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                    <h2 className="text-2xl text-white font-black tracking-tight italic">9. Contacto</h2>
                    <p className="not-italic">
                        <b className="text-white">{companyName}</b><br />
                        {companyAddress}<br />
                        Tel: +1 307 4293264<br />
                        Email: <span className="text-violet-400">{supportEmail}</span>
                    </p>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
