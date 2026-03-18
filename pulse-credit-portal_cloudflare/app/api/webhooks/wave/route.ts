import { NextResponse } from 'next/server';
import { createPortalAdminClient } from '@/lib/supabase/admin';
import { syncWaveToSupabase } from '@/lib/wave';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Wave Webhook Received:', JSON.stringify(body, null, 2));

        const eventType = body.type;
        const businessId = body.businessId;

        // Verify business ID (Optional but recommended)
        if (businessId !== process.env.WAVE_BUSINESS_ID) {
            return NextResponse.json({ error: 'Unauthorized business' }, { status: 401 });
        }

        let waveCustomerId: string | null = null;

        // Extract customer ID based on event type
        if (eventType.startsWith('invoice.')) {
            waveCustomerId = body.data.customer.id;
        } else if (eventType.startsWith('payment.')) {
            waveCustomerId = body.data.customer.id;
        }

        if (waveCustomerId) {
            const supabase = createPortalAdminClient();
            
            // Find the Supabase customer
            const { data: customer, error } = await supabase
                .from('customers')
                .select('id')
                .eq('wave_customer_id', waveCustomerId)
                .single();

            if (customer && !error) {
                // Trigger full sync for this customer
                await syncWaveToSupabase(waveCustomerId, customer.id);
                console.log(`Synced Wave data for customer: ${customer.id}`);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Wave Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
