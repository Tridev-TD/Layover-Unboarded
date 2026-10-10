-- Optional PostgreSQL/Supabase schema for authenticated multi-device persistence.
-- Apply with the Supabase SQL editor or your migration runner after enabling auth.
create table if not exists public.traveller_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  xp integer not null default 0 check (xp >= 0),
  stamps jsonb not null default '[]'::jsonb,
  active_quest jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.quest_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quest jsonb not null,
  completed_at timestamptz not null default now()
);

alter table public.traveller_profiles enable row level security;
alter table public.quest_history enable row level security;

create policy "users can manage their own profile"
on public.traveller_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users can manage their own quest history"
on public.quest_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
