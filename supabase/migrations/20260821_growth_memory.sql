begin;

-- =========================================================
-- Growth Memory v1 — CarrierTrust Growth OS
-- Long-lived Sales/PR outreach memory (companies, contacts,
-- interactions, state, learning events).
-- Writes intended via service_role (Next.js admin helpers).
-- No Zoho sync, inbox sync, or cron in this migration.
-- =========================================================


-- =========================================================
-- growth_companies
-- =========================================================

create table if not exists public.growth_companies (
  id uuid primary key default gen_random_uuid(),

  company_name text not null,
  normalized_name text not null,
  website text,
  domain text,
  country text,
  vat_number text,
  source text not null default 'manual',
  status text not null default 'active'
    check (status in ('active', 'archived', 'possible_duplicate')),

  possible_duplicate_of uuid
    references public.growth_companies(id)
    on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists growth_companies_normalized_name_unique
  on public.growth_companies (normalized_name)
  where status <> 'archived';

create unique index if not exists growth_companies_domain_unique
  on public.growth_companies (domain)
  where domain is not null and status <> 'archived';

create index if not exists growth_companies_status_idx
  on public.growth_companies (status);

create index if not exists growth_companies_possible_dup_idx
  on public.growth_companies (possible_duplicate_of)
  where possible_duplicate_of is not null;

drop trigger if exists growth_companies_set_updated_at
  on public.growth_companies;

create trigger growth_companies_set_updated_at
before update on public.growth_companies
for each row
execute function public.carriertrust_set_updated_at();


-- =========================================================
-- growth_contacts
-- =========================================================

create table if not exists public.growth_contacts (
  id uuid primary key default gen_random_uuid(),

  company_id uuid not null
    references public.growth_companies(id)
    on delete cascade,

  email text not null,
  normalized_email text not null,
  name text,
  role text,
  source text not null default 'manual',

  possible_duplicate_of uuid
    references public.growth_contacts(id)
    on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One contact email globally (outreach dedupe across companies)
create unique index if not exists growth_contacts_normalized_email_unique
  on public.growth_contacts (normalized_email);

create index if not exists growth_contacts_company_idx
  on public.growth_contacts (company_id);

create index if not exists growth_contacts_possible_dup_idx
  on public.growth_contacts (possible_duplicate_of)
  where possible_duplicate_of is not null;

drop trigger if exists growth_contacts_set_updated_at
  on public.growth_contacts;

create trigger growth_contacts_set_updated_at
before update on public.growth_contacts
for each row
execute function public.carriertrust_set_updated_at();


-- =========================================================
-- growth_interactions
-- =========================================================

create table if not exists public.growth_interactions (
  id uuid primary key default gen_random_uuid(),

  company_id uuid not null
    references public.growth_companies(id)
    on delete cascade,

  contact_id uuid
    references public.growth_contacts(id)
    on delete set null,

  type text not null
    check (type in (
      'ai_draft',
      'zoho_draft',
      'sent',
      'received',
      'note',
      'follow_up'
    )),

  zoho_message_id text,
  zoho_thread_id text,
  subject text,
  body text,
  summary text,
  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index if not exists growth_interactions_company_created_idx
  on public.growth_interactions (company_id, created_at desc);

create index if not exists growth_interactions_contact_created_idx
  on public.growth_interactions (contact_id, created_at desc)
  where contact_id is not null;

create index if not exists growth_interactions_type_idx
  on public.growth_interactions (type);

create unique index if not exists growth_interactions_zoho_message_unique
  on public.growth_interactions (zoho_message_id)
  where zoho_message_id is not null;


-- =========================================================
-- growth_company_state
-- =========================================================

create table if not exists public.growth_company_state (
  company_id uuid primary key
    references public.growth_companies(id)
    on delete cascade,

  outreach_status text not null default 'new'
    check (outreach_status in (
      'new',
      'draft_ready',
      'contacted',
      'replied',
      'interested',
      'not_interested',
      'follow_up_due',
      'registered',
      'do_not_contact'
    )),

  first_contacted_at timestamptz,
  last_contacted_at timestamptz,
  last_replied_at timestamptz,
  next_follow_up_at timestamptz,
  do_not_contact_reason text,

  updated_at timestamptz not null default now()
);

create index if not exists growth_company_state_status_idx
  on public.growth_company_state (outreach_status);

create index if not exists growth_company_state_follow_up_idx
  on public.growth_company_state (next_follow_up_at)
  where next_follow_up_at is not null;

drop trigger if exists growth_company_state_set_updated_at
  on public.growth_company_state;

create trigger growth_company_state_set_updated_at
before update on public.growth_company_state
for each row
execute function public.carriertrust_set_updated_at();


-- =========================================================
-- growth_learning_events
-- =========================================================

create table if not exists public.growth_learning_events (
  id uuid primary key default gen_random_uuid(),

  company_id uuid
    references public.growth_companies(id)
    on delete set null,

  contact_id uuid
    references public.growth_contacts(id)
    on delete set null,

  event_type text not null
    check (event_type in (
      'draft_generated',
      'draft_edited',
      'draft_saved',
      'sent',
      'positive_reply',
      'negative_reply',
      'registration'
    )),

  ai_original text,
  final_text text,
  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index if not exists growth_learning_events_company_created_idx
  on public.growth_learning_events (company_id, created_at desc)
  where company_id is not null;

create index if not exists growth_learning_events_type_idx
  on public.growth_learning_events (event_type, created_at desc);


-- =========================================================
-- Row Level Security
-- Browser clients: no access. Service role bypasses RLS.
-- =========================================================

alter table public.growth_companies enable row level security;
alter table public.growth_contacts enable row level security;
alter table public.growth_interactions enable row level security;
alter table public.growth_company_state enable row level security;
alter table public.growth_learning_events enable row level security;

revoke all on public.growth_companies from anon, authenticated;
revoke all on public.growth_contacts from anon, authenticated;
revoke all on public.growth_interactions from anon, authenticated;
revoke all on public.growth_company_state from anon, authenticated;
revoke all on public.growth_learning_events from anon, authenticated;

grant all on public.growth_companies to service_role;
grant all on public.growth_contacts to service_role;
grant all on public.growth_interactions to service_role;
grant all on public.growth_company_state to service_role;
grant all on public.growth_learning_events to service_role;

commit;
