begin;

alter table public.growth_interactions
add column if not exists occurred_at timestamptz;

update public.growth_interactions
set occurred_at =
  case
    when metadata->>'date' is not null
      and metadata->>'date' <> ''
    then (metadata->>'date')::timestamptz
    else created_at
  end
where occurred_at is null;

alter table public.growth_interactions
alter column occurred_at set default now();

create index if not exists growth_interactions_company_occurred_idx
on public.growth_interactions (company_id, occurred_at desc);

commit;
