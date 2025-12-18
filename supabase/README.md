# Supabase Migrations

This folder contains database migration files for the NEDU payment system.

## Structure

```
supabase/
├── migrations/        # Forward migration files
│   └── 001_*.sql     # Numbered migration files
├── rollbacks/         # Rollback scripts
│   └── 001_*_rollback.sql
└── README.md
```

## How to Run Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of the migration file
4. Run the SQL

### Using Supabase CLI

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

## Migration Files

| File | Description |
|------|-------------|
| `001_payment_tables.sql` | Creates transactions, receipts, webhook_logs tables |

## Rollback

To rollback a migration, run the corresponding rollback file:

```bash
# In Supabase SQL Editor, run:
supabase/rollbacks/001_payment_tables_rollback.sql
```

> ⚠️ **Warning**: Rollbacks will delete data. Always backup before running rollbacks.

## Environment Variables

Make sure these are set in your `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
