-- Supabase SQL Schema for Pulse Credit Portal

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    ein TEXT NOT NULL,
    corporate_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT,
    preliminary_score INTEGER,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'inactive',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    stripe_invoice_id TEXT,
    amount_cents INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Policies for customers
CREATE POLICY "Users can view their own customer record"
    ON public.customers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer record"
    ON public.customers FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all customers"
    ON public.customers FOR ALL
    USING (true)
    WITH CHECK (true);

-- Policies for invoices
CREATE POLICY "Users can view their own invoices"
    ON public.invoices FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.customers
            WHERE public.customers.id = public.invoices.customer_id
            AND public.customers.user_id = auth.uid()
        )
    );

CREATE POLICY "Service role can manage all invoices"
    ON public.invoices FOR ALL
    USING (true)
    WITH CHECK (true);
