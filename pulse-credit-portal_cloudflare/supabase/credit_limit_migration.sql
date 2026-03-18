-- Add credit_limit column to customers table for tier-based limits
-- Allows dynamically assigning limits based on pre-qualification score (Tier 1: $1500, Tier 2: $1000, Tier 3: $500)
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS credit_limit INTEGER DEFAULT 500;
