-- Optional cloud backend proposal for the next project phase.
-- The current app stores its routine locally on the phone and controls the ball via BLE.
-- Run this in a Supabase project's SQL editor only after creating that project.

create table if not exists public.device_presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My routine',
  speed integer not null default 12 check (speed between 1 and 20),
  interval_seconds integer not null default 15 check (interval_seconds between 1 and 20),
  motor_mode text not null default 'Gentle' check (motor_mode in ('Gentle', 'Dynamic', 'Random')),
  light_mode text not null default 'Constant' check (light_mode in ('Constant', 'Breathing', 'Heartbeat')),
  updated_at timestamptz not null default now()
);

create table if not exists public.device_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_label text not null default 'VisioBal',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  last_command text
);

alter table public.device_presets enable row level security;
alter table public.device_sessions enable row level security;

create policy "Users manage their own presets"
  on public.device_presets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own sessions"
  on public.device_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
