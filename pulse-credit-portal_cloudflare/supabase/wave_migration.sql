-- Add new columns to existing tables
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS wave_customer_id TEXT UNIQUE;

ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS wave_invoice_id TEXT UNIQUE;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS invoice_number TEXT;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS due_date TIMESTAMPTZ;

-- Create the new payments table (drop first to ensure schema is correct since it's a new table)
DROP TABLE IF EXISTS public.payments;
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    wave_payment_id TEXT UNIQUE,
    amount_cents INTEGER NOT NULL,
    status TEXT NOT NULL,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop policies just in case they already exist to avoid errors
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "Service role can manage all payments" ON public.payments;

-- Create policies for payments
CREATE POLICY "Users can view their own payments"
    ON public.payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.customers
            WHERE public.customers.id = public.payments.customer_id
            AND public.customers.user_id = auth.uid()
        )
    );

CREATE POLICY "Service role can manage all payments"
    ON public.payments FOR ALL
    USING (true)
    WITH CHECK (true);
