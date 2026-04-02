/**
 * KAH GLOBAL — Auto Migration Runner
 * Runs on every `npm run dev` and `npm run build`
 *
 * Two connection methods (uses whichever is configured):
 *   1. SUPABASE_ACCESS_TOKEN  — Supabase Management API (easiest, no DB password needed)
 *                               Get it: https://supabase.com/dashboard/account/tokens
 *   2. SUPABASE_DATABASE_URL  — Direct PostgreSQL connection string
 */

import pg from 'pg';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env.local ──────────────────────────────────────────────────────────
const envPath = resolve(__dirname, '../.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key && !process.env[key]) process.env[key] = val;
  }
}

const ACCESS_TOKEN  = process.env.SUPABASE_ACCESS_TOKEN;
const DATABASE_URL  = process.env.SUPABASE_DATABASE_URL;
const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

// Extract project ref from URL: https://pohdjexqdvulknkctqci.supabase.co → pohdjexqdvulknkctqci
const PROJECT_REF = SUPABASE_URL.replace('https://', '').split('.')[0];

// ─── All migrations in order ──────────────────────────────────────────────────
const MIGRATIONS = [
  {
    name: '001_initial_schema',
    sql: `
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
      insert into hero_settings (id) values (1) on conflict (id) do nothing;

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

      create table if not exists why_us_features (
        id             bigint generated always as identity primary key,
        number         text default '01',
        title          text not null,
        description    text,
        display_order  integer default 0,
        created_at     timestamptz default now()
      );

      create table if not exists site_settings (
        key        text primary key,
        value      text,
        updated_at timestamptz default now()
      );
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

      alter table hero_settings   disable row level security;
      alter table products        disable row level security;
      alter table testimonials    disable row level security;
      alter table why_us_features disable row level security;
      alter table site_settings   disable row level security;
    `,
  },
  {
    name: '002_hero_video_url',
    sql: `alter table hero_settings add column if not exists hero_video_url text;`,
  },
  {
    name: '004_hero_category_images',
    sql: `
      alter table hero_settings add column if not exists cat_corporate_url  text;
      alter table hero_settings add column if not exists cat_school_url      text;
      alter table hero_settings add column if not exists cat_hotel_url       text;
      alter table hero_settings add column if not exists cat_industrial_url  text;
    `,
  },
  {
    name: '005_about_settings',
    sql: `
      create table if not exists about_settings (
        id                 integer primary key default 1,
        about_heading      text,
        about_intro        text,
        about_story1       text,
        about_story2       text,
        about_factory_url  text,
        about_factory_alt  text,
        about_highlights   text,
        updated_at         timestamptz default now()
      );
      insert into about_settings (id) values (1) on conflict (id) do nothing;
      alter table about_settings disable row level security;
    `,
  },
  {
    name: '006_gallery_images',
    sql: `
      create table if not exists gallery_images (
        id             bigint generated always as identity primary key,
        image_url      text not null,
        alt_text       text,
        display_order  integer default 0,
        created_at     timestamptz default now()
      );
      alter table gallery_images disable row level security;
    `,
  },
  {
    name: '003_storage_bucket',
    sql: `
      insert into storage.buckets (id, name, public)
      values ('kah-images', 'kah-images', true)
      on conflict (id) do nothing;
    `,
  },
];

// ─── Method 1: Supabase Management API ───────────────────────────────────────
async function runViaManagementApi(sqls) {
  for (const { name, sql } of sqls) {
    process.stdout.write(`  ⬆  ${name} … `);
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
      }
    );
    if (!res.ok) {
      const body = await res.text();
      console.log('\x1b[31m✗\x1b[0m');
      throw new Error(`Management API error for ${name}: ${body}`);
    }
    console.log('\x1b[32m✓\x1b[0m');
  }
}

// ─── Method 2: Direct PostgreSQL ─────────────────────────────────────────────
async function runViaDirectDb(sqls) {
  const client = new pg.Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(`
      create table if not exists _kah_migrations (
        name text primary key, applied_at timestamptz default now()
      );
    `);
    for (const { name, sql } of sqls) {
      process.stdout.write(`  ⬆  ${name} … `);
      await client.query('begin');
      await client.query(sql);
      await client.query('insert into _kah_migrations (name) values ($1)', [name]);
      await client.query('commit');
      console.log('\x1b[32m✓\x1b[0m');
    }
  } finally {
    await client.end();
  }
}

// ─── Management API: get already-applied migrations ──────────────────────────
async function getAppliedViaApi() {
  // We use a lightweight SELECT to check if _kah_migrations table exists
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          create table if not exists _kah_migrations (
            name text primary key, applied_at timestamptz default now()
          );
          select name from _kah_migrations;
        `,
      }),
    }
  );
  if (!res.ok) return new Set();
  const json = await res.json();
  // Response is array of result sets; last one is the SELECT
  const rows = Array.isArray(json) ? json : [];
  return new Set(rows.map((r) => r.name).filter(Boolean));
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  // Decide which method to use
  const hasToken = ACCESS_TOKEN && !ACCESS_TOKEN.includes('YOUR_');
  const hasDbUrl = DATABASE_URL && !DATABASE_URL.includes('YOUR_DB_PASSWORD');

  if (!hasToken && !hasDbUrl) {
    console.log('\x1b[33m⚠  Skipping migrations — no credentials configured.\x1b[0m');
    console.log('   Add SUPABASE_ACCESS_TOKEN to .env.local (easiest):');
    console.log('   https://supabase.com/dashboard/account/tokens\n');
    return;
  }

  if (hasToken) {
    console.log('   Method: Supabase Management API');
    const applied = await getAppliedViaApi();
    const pending = MIGRATIONS.filter((m) => !applied.has(m.name));
    if (pending.length === 0) {
      console.log('\x1b[32m✓ Database up to date.\x1b[0m\n');
      return;
    }
    await runViaManagementApi(pending);
    // Record applied
    const recordSql = pending
      .map((m) => `insert into _kah_migrations (name) values ('${m.name}') on conflict do nothing;`)
      .join('\n');
    await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: recordSql }),
    });
  } else {
    console.log('   Method: Direct PostgreSQL');
    const client = new pg.Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
    await client.connect();
    await client.query(`create table if not exists _kah_migrations (name text primary key, applied_at timestamptz default now());`);
    const { rows } = await client.query('select name from _kah_migrations');
    await client.end();
    const applied = new Set(rows.map((r) => r.name));
    const pending = MIGRATIONS.filter((m) => !applied.has(m.name));
    if (pending.length === 0) {
      console.log('\x1b[32m✓ Database up to date.\x1b[0m\n');
      return;
    }
    await runViaDirectDb(pending);
  }

  console.log(`\x1b[32m✓ Migrations applied.\x1b[0m\n`);
}

console.log('\n\x1b[36m◆ KAH Global — Running database migrations…\x1b[0m');
run().catch((err) => {
  console.error('\x1b[31m✗ Migration error:\x1b[0m', err.message);
  // Non-fatal — dev server still starts
});
