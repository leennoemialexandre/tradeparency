-- Tradeparency event log schema.
-- Run this in the Supabase SQL editor (or via `supabase db push`) to provision
-- persistence for the app. See README.md for setup instructions.

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null,
  step text,
  product_id text,
  question_id text,
  correct boolean,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists events_session_id_idx on public.events (session_id);
create index if not exists events_event_type_idx on public.events (event_type);
create index if not exists events_created_at_idx on public.events (created_at);

-- Row Level Security: the app writes/reads exclusively through the server-side
-- API routes using the service role key, so RLS can stay enabled with no
-- public policies. This prevents the browser's anon key (if ever exposed)
-- from reading or writing event data directly.
alter table public.events enable row level security;
