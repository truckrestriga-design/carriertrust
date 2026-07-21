begin;

-- =========================================================
-- Helper: check whether current user is approved company owner
-- =========================================================

create or replace function public.is_approved_company_owner(
  target_company_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.company_claims cc
    where cc.company_id = target_company_id
      and cc.claimant_user_id = auth.uid()
      and cc.status = 'approved'
  );
$$;

revoke all on function public.is_approved_company_owner(uuid) from public;
grant execute on function public.is_approved_company_owner(uuid) to authenticated;
grant execute on function public.is_approved_company_owner(uuid) to service_role;


-- =========================================================
-- Shared updated_at trigger
-- =========================================================

create or replace function public.carriertrust_set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- Active and disabled company team members
-- Owner remains in company_claims and is not duplicated here
-- =========================================================

create table if not exists public.company_team_members (
  id uuid primary key default gen_random_uuid(),

  company_id uuid not null
    references public.companies(id)
    on delete cascade,

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  email text not null,

  role text not null default 'manager'
    check (role in ('manager')),

  status text not null default 'active'
    check (status in ('active', 'disabled', 'removed')),

  invited_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz not null default now(),
  accepted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint company_team_members_company_user_unique
    unique (company_id, user_id)
);

create unique index if not exists
  company_team_members_company_email_unique
on public.company_team_members (
  company_id,
  lower(btrim(email))
);

create index if not exists
  company_team_members_user_status_idx
on public.company_team_members (
  user_id,
  status
);

create index if not exists
  company_team_members_company_status_idx
on public.company_team_members (
  company_id,
  status
);

drop trigger if exists
  company_team_members_set_updated_at
on public.company_team_members;

create trigger company_team_members_set_updated_at
before update on public.company_team_members
for each row
execute function public.carriertrust_set_updated_at();


-- =========================================================
-- Pending invitations
-- Only a SHA-256 token hash is stored, never the raw token
-- =========================================================

create table if not exists public.company_team_invites (
  id uuid primary key default gen_random_uuid(),

  company_id uuid not null
    references public.companies(id)
    on delete cascade,

  email text not null,

  role text not null default 'manager'
    check (role in ('manager')),

  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'revoked', 'expired')),

  token_hash text not null unique
    check (char_length(token_hash) = 64),

  expires_at timestamptz not null,

  created_by uuid not null
    references auth.users(id)
    on delete cascade,

  accepted_by uuid
    references auth.users(id)
    on delete set null,

  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  revoked_at timestamptz,
  updated_at timestamptz not null default now(),

  constraint company_team_invites_expiry_check
    check (expires_at > created_at)
);

create unique index if not exists
  company_team_invites_one_pending_email
on public.company_team_invites (
  company_id,
  lower(btrim(email))
)
where status = 'pending';

create index if not exists
  company_team_invites_company_status_idx
on public.company_team_invites (
  company_id,
  status,
  created_at desc
);

create index if not exists
  company_team_invites_expiry_idx
on public.company_team_invites (
  expires_at
)
where status = 'pending';

drop trigger if exists
  company_team_invites_set_updated_at
on public.company_team_invites;

create trigger company_team_invites_set_updated_at
before update on public.company_team_invites
for each row
execute function public.carriertrust_set_updated_at();


-- =========================================================
-- Row Level Security
-- All writes will later go through protected Edge Functions
-- =========================================================

alter table public.company_team_members enable row level security;
alter table public.company_team_invites enable row level security;

drop policy if exists
  "Team members: owner can read company team"
on public.company_team_members;

create policy "Team members: owner can read company team"
on public.company_team_members
for select
to authenticated
using (
  public.is_approved_company_owner(company_id)
);

drop policy if exists
  "Team members: user can read own membership"
on public.company_team_members;

create policy "Team members: user can read own membership"
on public.company_team_members
for select
to authenticated
using (
  user_id = auth.uid()
);

drop policy if exists
  "Team invites: owner can read company invites"
on public.company_team_invites;

create policy "Team invites: owner can read company invites"
on public.company_team_invites
for select
to authenticated
using (
  public.is_approved_company_owner(company_id)
);


-- =========================================================
-- Permissions
-- SELECT is controlled by RLS.
-- No browser-side INSERT, UPDATE or DELETE permissions.
-- =========================================================

revoke all on public.company_team_members from anon;
revoke all on public.company_team_invites from anon;

revoke insert, update, delete
on public.company_team_members
from authenticated;

revoke insert, update, delete
on public.company_team_invites
from authenticated;

grant select
on public.company_team_members
to authenticated;

grant select
on public.company_team_invites
to authenticated;

commit;
