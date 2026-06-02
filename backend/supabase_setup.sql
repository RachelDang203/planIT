-- ================================================
-- planIT - Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ================================================

-- 1. USERS TABLE
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  created_at timestamp with time zone default now()
);

-- 2. TASKS TABLE
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  subject text not null,
  deadline text not null,
  priority text not null check (priority in ('low', 'medium', 'high')),
  duration integer not null default 1,
  notes text default '',
  ai_enabled boolean default true,
  done boolean default false,
  created_at timestamp with time zone default now()
);

-- 3. ROW LEVEL SECURITY (users can only see their own data)
alter table public.users enable row level security;
alter table public.tasks enable row level security;

create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can view own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);
