-- Rollback: 001_payment_tables
-- Description: Rollback enhanced payment tables
-- Warning: This will delete all data in these tables!

-- Drop triggers
DROP TRIGGER IF EXISTS update_transactions_updated_at ON public.transactions;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS generate_receipt_number();

-- Drop policies
DROP POLICY IF EXISTS "Service role can manage transactions" ON public.transactions;
DROP POLICY IF EXISTS "Service role can manage receipts" ON public.receipts;
DROP POLICY IF EXISTS "Service role can manage webhook_logs" ON public.webhook_logs;

-- Drop tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS public.webhook_logs;
DROP TABLE IF EXISTS public.receipts;
DROP TABLE IF EXISTS public.transactions;

-- Remove added columns from order table
ALTER TABLE public."order" DROP COLUMN IF EXISTS transaction_id;
ALTER TABLE public."order" DROP COLUMN IF EXISTS receipt_id;
ALTER TABLE public."order" DROP COLUMN IF EXISTS coupon_code;
ALTER TABLE public."order" DROP COLUMN IF EXISTS course_name;
