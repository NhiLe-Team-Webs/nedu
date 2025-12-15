-- Migration: 001_payment_tables
-- Description: Create enhanced payment tables for the payment backend system
-- Created: 2025-12-15

-- =====================================================
-- TRANSACTIONS TABLE (Enhanced)
-- Stores all payment transaction records
-- =====================================================
CREATE TABLE IF NOT EXISTS public.transactions (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    
    -- Order reference
    order_id bigint NOT NULL,
    order_code varchar(50) NOT NULL,
    
    -- Payment details
    amount numeric NOT NULL,
    currency varchar(10) DEFAULT 'VND',
    
    -- Status: pending, processing, success, failed, cancelled, refunded
    status varchar(50) NOT NULL DEFAULT 'pending',
    
    -- Payment gateway info
    gateway varchar(50) DEFAULT 'sepay',
    gateway_transaction_id varchar(255),
    gateway_reference_code varchar(255),
    
    -- QR Code info
    qr_code_url text,
    
    -- Timestamps from gateway
    payment_date timestamp with time zone,
    
    -- Metadata (JSON for flexible data)
    metadata jsonb DEFAULT '{}'::jsonb,
    
    -- Constraints
    CONSTRAINT fk_transactions_order FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON public.transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_code ON public.transactions(order_code);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_gateway_transaction_id ON public.transactions(gateway_transaction_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);

-- =====================================================
-- RECEIPTS TABLE
-- Stores receipt records for completed payments
-- =====================================================
CREATE TABLE IF NOT EXISTS public.receipts (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    -- References
    order_id bigint NOT NULL,
    transaction_id bigint NOT NULL,
    
    -- Receipt details
    receipt_number varchar(50) NOT NULL UNIQUE,
    
    -- Customer info snapshot (preserved at time of receipt)
    customer_name varchar(255) NOT NULL,
    customer_email varchar(255) NOT NULL,
    customer_phone varchar(50),
    
    -- Payment info snapshot
    amount numeric NOT NULL,
    currency varchar(10) DEFAULT 'VND',
    payment_method varchar(50) DEFAULT 'bank_transfer',
    
    -- Program/Course info
    program_data jsonb DEFAULT '{}'::jsonb,
    
    -- Receipt metadata
    issued_at timestamp with time zone NOT NULL DEFAULT now(),
    
    -- Constraints
    CONSTRAINT fk_receipts_order FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE,
    CONSTRAINT fk_receipts_transaction FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_receipts_order_id ON public.receipts(order_id);
CREATE INDEX IF NOT EXISTS idx_receipts_receipt_number ON public.receipts(receipt_number);

-- =====================================================
-- WEBHOOK_LOGS TABLE
-- Audit trail for all webhook events
-- =====================================================
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    
    -- Webhook info
    gateway varchar(50) NOT NULL,
    event_type varchar(50),
    
    -- Request data
    raw_payload jsonb NOT NULL,
    headers jsonb,
    
    -- Processing result
    processed boolean DEFAULT false,
    processing_result varchar(50),
    error_message text,
    
    -- Related order (if identified)
    order_code varchar(50),
    order_id bigint,
    
    -- IP for security tracking
    source_ip varchar(50)
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_order_code ON public.webhook_logs(order_code);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON public.webhook_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_processed ON public.webhook_logs(processed);

-- =====================================================
-- Update existing ORDER table with additional fields
-- =====================================================
-- Add transaction_id column if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'order' 
                   AND column_name = 'transaction_id') THEN
        ALTER TABLE public."order" ADD COLUMN transaction_id bigint;
    END IF;
END $$;

-- Add receipt_id column if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'order' 
                   AND column_name = 'receipt_id') THEN
        ALTER TABLE public."order" ADD COLUMN receipt_id bigint;
    END IF;
END $$;

-- Add coupon_code column if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'order' 
                   AND column_name = 'coupon_code') THEN
        ALTER TABLE public."order" ADD COLUMN coupon_code varchar(100);
    END IF;
END $$;

-- Add course_name column if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'order' 
                   AND column_name = 'course_name') THEN
        ALTER TABLE public."order" ADD COLUMN course_name text;
    END IF;
END $$;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================
-- Enable RLS on new tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

-- Policies for service role (backend) - full access
CREATE POLICY "Service role can manage transactions" ON public.transactions
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage receipts" ON public.receipts
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage webhook_logs" ON public.webhook_logs
    FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for transactions table
DROP TRIGGER IF EXISTS update_transactions_updated_at ON public.transactions;
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to generate receipt number
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS varchar AS $$
DECLARE
    receipt_num varchar;
BEGIN
    receipt_num := 'RCP' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                   LPAD(CAST(FLOOR(RANDOM() * 10000) AS varchar), 4, '0');
    RETURN receipt_num;
END;
$$ LANGUAGE plpgsql;
