-- Run this once in the Supabase SQL editor for the Nexfit desk.
-- Dashboard → SQL → New query → paste → Run.

create table if not exists public.clients (
  id text primary key,
  name text not null,
  district text not null,
  logo text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id text primary key,
  quote text not null,
  name text not null,
  role text not null default '',
  gym text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  slug text primary key,
  title text not null,
  description text not null,
  date text not null,
  updated text not null,
  author text not null default 'Nexfit',
  tags jsonb not null default '[]'::jsonb,
  reading_minutes integer not null default 4,
  related_slugs jsonb not null default '[]'::jsonb,
  image text not null default '',
  blocks jsonb not null default '[]'::jsonb
);

create table if not exists public.messages (
  id text primary key,
  name text not null,
  studio text not null default '',
  email text not null,
  phone text not null default '',
  package_interest text not null default '',
  message text not null,
  received_at timestamptz not null default now()
);

alter table public.clients enable row level security;
alter table public.reviews enable row level security;
alter table public.posts enable row level security;
alter table public.messages enable row level security;

-- Public site can read marketing content. Messages stay private (service role only).
drop policy if exists "Public read clients" on public.clients;
create policy "Public read clients" on public.clients for select using (true);

drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews" on public.reviews for select using (true);

drop policy if exists "Public read posts" on public.posts;
create policy "Public read posts" on public.posts for select using (true);

-- Storage for gym logos/photos, blog covers + article images, and review photos.
-- Files land under clients/, blog/, and reviews/ inside this public bucket.
-- The posts.image column holds the cover URL; image blocks in posts.blocks hold article image URLs.
insert into storage.buckets (id, name, public)
values ('desk-media', 'desk-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read desk media" on storage.objects;
create policy "Public read desk media"
  on storage.objects for select
  using (bucket_id = 'desk-media');

-- Writes use the service role key from the Next.js server (bypasses RLS).
