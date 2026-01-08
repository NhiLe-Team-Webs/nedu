-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.accounts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at date DEFAULT now(),
  username text,
  password text NOT NULL,
  email text NOT NULL,
  last_login date,
  role_id bigint NOT NULL,
  status smallint,
  fullname text,
  permissions json,
  uuid uuid,
  CONSTRAINT accounts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.admin (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  last_login date,
  CONSTRAINT admin_pkey PRIMARY KEY (id)
);
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text,
  role text DEFAULT 'admin'::text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT admin_users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.banner (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  image character varying,
  update_at timestamp with time zone DEFAULT now(),
  status smallint,
  position smallint NOT NULL,
  link character varying,
  sort_order smallint,
  CONSTRAINT banner_pkey PRIMARY KEY (id)
);
CREATE TABLE public.banner_description (
  lang_id bigint NOT NULL,
  name text,
  link character varying,
  short_description text,
  banner_id bigint NOT NULL,
  CONSTRAINT banner_description_pkey PRIMARY KEY (lang_id, banner_id)
);
CREATE TABLE public.category (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  update_at timestamp with time zone DEFAULT now(),
  image character varying,
  parent_id bigint,
  type smallint,
  sort_order smallint,
  status smallint,
  CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.category_description (
  category_id bigint NOT NULL,
  lang_id bigint NOT NULL,
  name text,
  short_description text,
  description text,
  meta_title text,
  meta_description text,
  meta_keyword text,
  CONSTRAINT category_description_pkey PRIMARY KEY (category_id, lang_id)
);
CREATE TABLE public.config (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  type text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT config_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contact (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  email character varying,
  phone numeric,
  status smallint,
  content text,
  telegram character varying,
  update_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_pkey PRIMARY KEY (id)
);
CREATE TABLE public.file (
  deleted boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  origin_url character varying,
  width integer,
  height integer,
  size integer,
  public_id character varying,
  user_id integer,
  type integer DEFAULT 0,
  data character varying,
  id integer NOT NULL DEFAULT nextval('file_id_seq1'::regclass),
  CONSTRAINT file_pkey PRIMARY KEY (id)
);
CREATE TABLE public.language (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  update_at timestamp with time zone DEFAULT now(),
  code character varying,
  short_code character varying,
  name character varying,
  image character varying,
  default smallint DEFAULT '0'::smallint,
  status smallint,
  CONSTRAINT language_pkey PRIMARY KEY (id)
);
CREATE TABLE public.log_order (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  update_at timestamp with time zone DEFAULT now(),
  full_name character varying,
  email character varying,
  phone character varying,
  telegram character varying NOT NULL,
  birthday date,
  gender character varying,
  address character varying,
  note text,
  program character varying NOT NULL,
  price numeric,
  status boolean,
  CONSTRAINT log_order_pkey PRIMARY KEY (id)
);
CREATE TABLE public.menu (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status smallint,
  parent_id bigint NOT NULL DEFAULT '0'::bigint,
  sort_order smallint,
  position smallint,
  icon character varying,
  update_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_pkey PRIMARY KEY (id)
);
CREATE TABLE public.menu_description (
  menu_id bigint NOT NULL,
  name character varying,
  lang_id bigint NOT NULL,
  short_description text,
  link character varying,
  CONSTRAINT menu_description_pkey PRIMARY KEY (menu_id, lang_id)
);
CREATE TABLE public.order (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  update_at timestamp with time zone DEFAULT now(),
  full_name character varying,
  email character varying,
  phone character varying,
  telegram character varying NOT NULL,
  birthday date,
  gender character varying,
  address character varying,
  note text,
  program character varying NOT NULL,
  price numeric,
  program_id bigint,
  status smallint DEFAULT '0'::smallint,
  code uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  program_data jsonb DEFAULT '{}'::jsonb,
  transaction_id bigint,
  receipt_id bigint,
  coupon_code character varying,
  course_name text,
  CONSTRAINT order_pkey PRIMARY KEY (id)
);
CREATE TABLE public.page_common (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  type smallint,
  is_public smallint,
  status smallint DEFAULT '1'::smallint,
  CONSTRAINT page_common_pkey PRIMARY KEY (id)
);
CREATE TABLE public.page_common_description (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  lang_id bigint NOT NULL,
  page_common_id bigint NOT NULL,
  value jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT page_common_description_pkey PRIMARY KEY (lang_id, page_common_id)
);
CREATE TABLE public.partner (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  sort_order smallint,
  update_at timestamp with time zone DEFAULT now(),
  image character varying,
  link character varying,
  status smallint,
  type smallint,
  highlight smallint,
  CONSTRAINT partner_pkey PRIMARY KEY (id)
);
CREATE TABLE public.partner_description (
  lang_id bigint NOT NULL,
  name character varying NOT NULL,
  description text,
  partner_id bigint NOT NULL,
  CONSTRAINT partner_description_pkey PRIMARY KEY (lang_id, partner_id)
);
CREATE TABLE public.payment (
  deleted boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  id bigint NOT NULL DEFAULT nextval('payment_id_seq1'::regclass),
  source_id character varying NOT NULL,
  vnpTxnRef character varying NOT NULL UNIQUE,
  amount numeric NOT NULL,
  status character varying NOT NULL DEFAULT 'pending'::character varying,
  CONSTRAINT payment_pkey PRIMARY KEY (id)
);
CREATE TABLE public.payment_history (
  deleted boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  id bigint NOT NULL DEFAULT nextval('payment_history_id_seq1'::regclass),
  payment_id bigint,
  status character varying NOT NULL DEFAULT 'pending'::character varying,
  message character varying,
  rsp_code text,
  params text,
  CONSTRAINT payment_history_pkey PRIMARY KEY (id),
  CONSTRAINT FK_34e09242082136eb5e16b24dfa3 FOREIGN KEY (payment_id) REFERENCES public.payment(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text,
  role text DEFAULT 'student'::text,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.program (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  image character varying,
  program_price numeric,
  instructor text,
  hashtag text,
  program_name text,
  total_sessions text,
  is_payment_full boolean DEFAULT true,
  season numeric,
  link_payment text,
  category_id bigint,
  program_type integer,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  sort_order bigint,
  status smallint,
  highlight_program smallint,
  course integer,
  video character varying,
  banner character varying,
  link_facebook character varying,
  link_instagram character varying,
  session smallint,
  program_fee character varying,
  mission_image character varying,
  link_group character varying,
  CONSTRAINT program_pkey PRIMARY KEY (id)
);
CREATE TABLE public.program_description (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  lang_id bigint NOT NULL,
  program_id bigint NOT NULL,
  title_slogan character varying,
  slogan text,
  program_name text,
  instructors jsonb,
  target_audience jsonb,
  reasons_to_choose jsonb,
  information jsonb,
  program_schedule jsonb,
  privilege jsonb,
  meta_keyword character varying,
  meta_description character varying,
  meta_title character varying,
  CONSTRAINT program_description_pkey PRIMARY KEY (lang_id, program_id)
);
CREATE TABLE public.program_partner (
  program_id bigint NOT NULL,
  partner_id bigint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT program_partner_pkey PRIMARY KEY (program_id, partner_id)
);
CREATE TABLE public.receipts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  order_id bigint NOT NULL,
  transaction_id bigint NOT NULL,
  receipt_number character varying NOT NULL UNIQUE,
  customer_name character varying NOT NULL,
  customer_email character varying NOT NULL,
  customer_phone character varying,
  amount numeric NOT NULL,
  currency character varying DEFAULT 'VND'::character varying,
  payment_method character varying DEFAULT 'bank_transfer'::character varying,
  program_data jsonb DEFAULT '{}'::jsonb,
  issued_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT receipts_pkey PRIMARY KEY (id),
  CONSTRAINT fk_receipts_order FOREIGN KEY (order_id) REFERENCES public.order(id),
  CONSTRAINT fk_receipts_transaction FOREIGN KEY (transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.roles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  update_at timestamp with time zone DEFAULT now(),
  permissions json,
  name character varying,
  level smallint,
  description character varying,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.setting (
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  type smallint NOT NULL,
  id integer NOT NULL DEFAULT nextval('setting_id_seq1'::regclass),
  status smallint DEFAULT '1'::smallint,
  is_public smallint DEFAULT '1'::smallint,
  CONSTRAINT setting_pkey PRIMARY KEY (id)
);
CREATE TABLE public.transactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  order_id bigint NOT NULL,
  order_code character varying NOT NULL,
  amount numeric NOT NULL,
  currency character varying DEFAULT 'VND'::character varying,
  status character varying NOT NULL DEFAULT 'pending'::character varying,
  gateway character varying DEFAULT 'sepay'::character varying,
  gateway_transaction_id character varying,
  gateway_reference_code character varying,
  qr_code_url text,
  payment_date timestamp with time zone,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT fk_transactions_order FOREIGN KEY (order_id) REFERENCES public.order(id)
);
CREATE TABLE public.user (
  deleted boolean NOT NULL DEFAULT false,
  updated_at timestamp without time zone DEFAULT now(),
  email character varying,
  avatar text,
  first_name character varying,
  last_name character varying,
  password character varying,
  role_id character varying,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp without time zone DEFAULT now(),
  social_id character varying,
  provider_type smallint,
  id integer NOT NULL DEFAULT nextval('user_id_seq1'::regclass),
  CONSTRAINT user_pkey PRIMARY KEY (id)
);
CREATE TABLE public.webhook_logs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  gateway character varying NOT NULL,
  event_type character varying,
  raw_payload jsonb NOT NULL,
  headers jsonb,
  processed boolean DEFAULT false,
  processing_result character varying,
  error_message text,
  order_code character varying,
  order_id bigint,
  source_ip character varying,
  CONSTRAINT webhook_logs_pkey PRIMARY KEY (id)
);