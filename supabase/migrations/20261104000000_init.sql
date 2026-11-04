-- Tabele za obrasce. Javnost (anon) sme samo da upisuje, ne i da čita.

create table if not exists public.couple_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  city text,
  wedding_month text,          -- format "YYYY-MM"
  guests integer,
  consent boolean not null default false
);

create table if not exists public.vendor_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  category text not null,
  city text not null,
  contact_name text not null,
  phone text,
  email text not null,
  website text,
  capacity integer,
  price_from numeric,
  note text,
  consent boolean not null default false,
  source_vendor_slug text
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  vendor_slug text not null,
  name text not null,
  phone text,
  email text not null,
  date date,
  guests integer,
  message text,
  consent boolean not null default false
);

alter table public.couple_signups enable row level security;
alter table public.vendor_signups enable row level security;
alter table public.inquiries enable row level security;

-- Samo insert, i to samo uz saglasnost. Nema select/update/delete politika,
-- pa javnost ne može da čita ni menja podatke (servisni ključ i dalje vidi sve).
create policy "anon insert couple_signups" on public.couple_signups
  for insert to anon, authenticated with check (consent = true);

create policy "anon insert vendor_signups" on public.vendor_signups
  for insert to anon, authenticated with check (consent = true);

create policy "anon insert inquiries" on public.inquiries
  for insert to anon, authenticated with check (consent = true);

-- Za svaki slučaj ukidamo čitanje i izmene na nivou privilegija.
revoke select, update, delete on public.couple_signups from anon, authenticated;
revoke select, update, delete on public.vendor_signups from anon, authenticated;
revoke select, update, delete on public.inquiries from anon, authenticated;
grant insert on public.couple_signups to anon, authenticated;
grant insert on public.vendor_signups to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
