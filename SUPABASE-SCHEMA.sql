-- UCH Procurement Portal - Supabase SQL Schema
-- Run this script in your Supabase SQL Editor to set up the database

-- Create notices table
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('tender', 'notice', 'award', 'advert')),
  summary text,
  body text,
  ref_no text,
  deadline timestamptz,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table notices enable row level security;

-- Policy: Public can read published notices
create policy "Public can read published notices"
  on notices for select
  using (published = true);

-- Policy: Authenticated users (procurement officers) can manage all notices
create policy "Authenticated can manage notices"
  on notices for all
  using (auth.role() = 'authenticated');

-- Create indexes for performance
create index idx_notices_type on notices (type);
create index idx_notices_published on notices (published);
create index idx_notices_created_at on notices (created_at desc);
create index idx_notices_deadline on notices (deadline);
