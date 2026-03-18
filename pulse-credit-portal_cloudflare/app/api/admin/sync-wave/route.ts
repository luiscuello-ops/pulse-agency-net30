import { NextResponse } from 'next/server';
import { createPortalAdminClient } from '@/lib/supabase/admin';
import { syncWaveToSupabase } from '@/lib/wave';

// This route allows an admin to manually trigger a sync from Wave for all customers
// Usage: POST /api/admin/sync-wave
export async function POST() {
    try {
        const supabase = createPortalAdminClient();

        // Get all customers that are linked to Wave
        const { data: customers, error } = await supabase
            .from('customers')
            .select('id, wave_customer_id')
            .not('wave_customer_id', 'is', null);

        if (error || !customers) {
            console.error('Failed to fetch customers:', error);
            return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
        }

        let syncedCount = 0;
        let failedCount = 0;

        for (const customer of customers) {
            try {
                if (customer.wave_customer_id) {
                    await syncWaveToSupabase(customer.wave_customer_id, customer.id);
                    syncedCount++;
                }
            } catch (err) {
                console.error(`Failed to sync customer ${customer.id}:`, err);
                failedCount++;
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: `Synchronization complete. Synced: ${syncedCount}, Failed: ${failedCount}` 
        });
    } catch (error) {
        console.error('Manual Wave Sync Error:', error);
        return NextResponse.json({ error: 'Manual sync failed' }, { status: 500 });
    }
}
