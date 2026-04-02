-- ============================================================
--  KAH GLOBAL WEBSITE — Supabase Database Setup
--  Run this entire file in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. HERO SETTINGS (single row, id = 1)
create table if not exists hero_settings (
  id               integer primary key default 1,
  eyebrow          text,
  headline         text,
  headline_accent  text,
  subheadline      text,
  hero_image_url   text,
  hero_image_alt   text,
  hero_video_url   text,
  updated_at       timestamptz default now()
);

-- Seed a default row so the admin panel can upsert
insert into hero_settings (id) values (1) on conflict (id) do nothing;

-- 2. PRODUCTS
create table if not exists products (
  id             bigint generated always as identity primary key,
  title          text not null,
  description    text,
  gradient       text default 'from-[#0A1F44] via-[#0d2855] to-[#1a3a6e]',
  image_url      text,
  image_alt      text,
  display_order  integer default 0,
  created_at     timestamptz default now()
);

-- 3. TESTIMONIALS
create table if not exists testimonials (
  id             bigint generated always as identity primary key,
  quote          text not null,
  name           text not null,
  job_title      text,
  company        text,
  avatar_url     text,
  display_order  integer default 0,
  created_at     timestamptz default now()
);

-- 4. WHY US FEATURES
create table if not exists why_us_features (
  id             bigint generated always as identity primary key,
  number         text default '01',
  title          text not null,
  description    text,
  display_order  integer default 0,
  created_at     timestamptz default now()
);

-- 5. SITE SETTINGS (key-value store)
create table if not exists site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- Seed default site settings
insert into site_settings (key, value) values
  ('company_name', 'Kah Global'),
  ('tagline',      'Premium uniforms crafted for excellence — serving businesses across the UAE since 2014.'),
  ('phone',        '+971 55 123 4567'),
  ('email',        'info@kahglobal.ae'),
  ('address',      'Dubai, United Arab Emirates'),
  ('whatsapp',     '971551234567'),
  ('instagram',    'https://instagram.com/kahglobal'),
  ('facebook',     'https://facebook.com/kahglobal'),
  ('footer_text',  '© 2025 Kah Global General Trading LLC. All rights reserved.'),
  ('logo_url',     '')
on conflict (key) do nothing;

-- ============================================================
--  STORAGE BUCKET — run this separately in SQL Editor
-- ============================================================
-- Creates a public bucket called "kah-images" for all uploads.
insert into storage.buckets (id, name, public)
values ('kah-images', 'kah-images', true)
on conflict (id) do nothing;

-- Allow anyone to read (public website images)
create policy "Public read kah-images"
  on storage.objects for select
  using ( bucket_id = 'kah-images' );

-- Allow authenticated users to upload (admin panel uses anon key + RLS bypass trick)
-- For simplicity we allow all uploads — tighten this with Supabase Auth later if needed
create policy "Allow all uploads kah-images"
  on storage.objects for insert
  with check ( bucket_id = 'kah-images' );

create policy "Allow all updates kah-images"
  on storage.objects for update
  using ( bucket_id = 'kah-images' );

-- ============================================================
--  ROW LEVEL SECURITY — disable for now (admin panel uses anon key)
--  Enable & configure if you add Supabase Auth later
-- ============================================================
alter table hero_settings   disable row level security;
alter table products        disable row level security;
alter table testimonials    disable row level security;
alter table why_us_features disable row level security;
alter table site_settings   disable row level security;
