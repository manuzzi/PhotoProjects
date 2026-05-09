-- ─────────────────────────────────────────────────────────────────────────────
-- PhotoProjects — Supabase Schema
-- Run this in the Supabase SQL Editor to initialize the database
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ─── Projects ────────────────────────────────────────────────────────────────
create table if not exists projects (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  genre       text not null default 'other',
  status      text not null default 'draft',
  concept     text default '',
  statement   text default '',
  intent      text default '',
  references  text default '',
  tags        text[] default '{}',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─── Moodboard Images ────────────────────────────────────────────────────────
create table if not exists moodboard_images (
  id                uuid primary key default uuid_generate_v4(),
  project_id        uuid references projects(id) on delete cascade not null,
  url               text not null,
  note              text default '',
  source            text not null default 'upload',
  pinterest_pin_id  text,
  "order"           integer default 0,
  created_at        timestamptz default now()
);

-- ─── Contacts ────────────────────────────────────────────────────────────────
create table if not exists contacts (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete cascade not null,
  name              text not null,
  email             text default '',
  phone             text default '',
  role              text not null default 'client',
  notes             text default '',
  social_instagram  text default '',
  social_linkedin   text default '',
  social_pinterest  text default '',
  social_tiktok     text default '',
  website           text default '',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ─── Project <> Contact ───────────────────────────────────────────────────────
create table if not exists project_contacts (
  project_id  uuid references projects(id) on delete cascade,
  contact_id  uuid references contacts(id) on delete cascade,
  role_note   text default '',
  primary key (project_id, contact_id)
);

-- ─── Budget ──────────────────────────────────────────────────────────────────
create table if not exists budgets (
  id              uuid primary key default uuid_generate_v4(),
  project_id      uuid references projects(id) on delete cascade not null,
  currency        text default 'EUR',
  margin_percent  numeric(5,2) default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table if not exists budget_items (
  id          uuid primary key default uuid_generate_v4(),
  budget_id   uuid references budgets(id) on delete cascade not null,
  category    text not null default 'other',
  description text not null,
  quantity    numeric(10,2) default 1,
  unit_cost   numeric(10,2) default 0,
  notes       text default ''
);

-- ─── Briefs / Offers ─────────────────────────────────────────────────────────
create table if not exists briefs (
  id            uuid primary key default uuid_generate_v4(),
  project_id    uuid references projects(id) on delete cascade not null,
  client_id     uuid references contacts(id) on delete set null,
  budget_id     uuid references budgets(id) on delete set null,
  title         text not null,
  description   text default '',
  deliverables  text[] default '{}',
  timeline      text default '',
  terms         text default '',
  status        text not null default 'draft',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table projects         enable row level security;
alter table moodboard_images enable row level security;
alter table contacts         enable row level security;
alter table project_contacts enable row level security;
alter table budgets          enable row level security;
alter table budget_items     enable row level security;
alter table briefs           enable row level security;

create policy "own projects"      on projects         for all using (auth.uid() = user_id);
create policy "own contacts"      on contacts         for all using (auth.uid() = user_id);
create policy "own moodboard"     on moodboard_images for all using (
  project_id in (select id from projects where user_id = auth.uid())
);
create policy "own budget"        on budgets          for all using (
  project_id in (select id from projects where user_id = auth.uid())
);
create policy "own budget items"  on budget_items     for all using (
  budget_id in (select id from budgets where project_id in (select id from projects where user_id = auth.uid()))
);
create policy "own briefs"        on briefs           for all using (
  project_id in (select id from projects where user_id = auth.uid())
);
create policy "own proj_contacts" on project_contacts for all using (
  project_id in (select id from projects where user_id = auth.uid())
);

-- ─── Auto-update updated_at ──────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_projects_updated  before update on projects for each row execute function update_updated_at();
create trigger trg_contacts_updated  before update on contacts for each row execute function update_updated_at();
create trigger trg_budgets_updated   before update on budgets  for each row execute function update_updated_at();
create trigger trg_briefs_updated    before update on briefs   for each row execute function update_updated_at();
