create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  status text not null default 'active' check (status in ('active', 'banned')),
  is_banned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists status text;

update public.profiles
set status = case
  when coalesce(is_banned, false) then 'banned'
  else 'active'
end
where status is null;

alter table public.profiles
alter column status set default 'active';

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  event_name text not null,
  buyer_email text not null,
  buyer_name text,
  quantity integer not null default 1 check (quantity > 0),
  total_price numeric not null default 0,
  status text not null default 'sold',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.is_admin(target_user_id uuid default auth.uid())
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = target_user_id
      and role = 'admin'
      and coalesce(status, 'active') = 'active'
  );
$$;

create or replace function public.sync_profile_from_auth(
  target_user_id uuid,
  target_email text,
  target_full_name text,
  target_avatar_url text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  result_profile public.profiles;
begin
  insert into public.profiles (id, email, full_name, avatar_url, role, status)
  values (
    target_user_id,
    target_email,
    nullif(target_full_name, ''),
    nullif(target_avatar_url, ''),
    case
      when lower(target_email) = 'eduard.ghitun@yahoo.com' then 'admin'
      else 'user'
    end,
    'active'
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
      status = coalesce(public.profiles.status, 'active'),
      role = case
        when lower(excluded.email) = 'eduard.ghitun@yahoo.com' then 'admin'
        else public.profiles.role
      end,
      updated_at = now()
  returning * into result_profile;

  return result_profile;
end;
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.sync_profile_from_auth(
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username'),
    new.raw_user_meta_data ->> 'avatar_url'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

insert into public.profiles (id, email, full_name, avatar_url, role, status)
select
  au.id,
  au.email,
  coalesce(au.raw_user_meta_data ->> 'full_name', au.raw_user_meta_data ->> 'name', au.raw_user_meta_data ->> 'username'),
  au.raw_user_meta_data ->> 'avatar_url',
  case
    when lower(au.email) = 'eduard.ghitun@yahoo.com' then 'admin'
    else 'user'
  end,
  case
    when coalesce(public.profiles.is_banned, false) then 'banned'
    else 'active'
  end
from auth.users au
left join public.profiles on public.profiles.id = au.id
on conflict (id) do update
set email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    status = coalesce(public.profiles.status, excluded.status, 'active'),
    role = case
      when lower(excluded.email) = 'eduard.ghitun@yahoo.com' then 'admin'
      else public.profiles.role
    end,
    updated_at = now();

update public.profiles
set role = 'admin',
    updated_at = now()
where lower(email) = 'eduard.ghitun@yahoo.com';

alter table public.profiles enable row level security;
alter table public.tickets enable row level security;

drop policy if exists "profiles_select_self" on public.profiles;
create policy "profiles_select_self"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
on public.profiles
for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles
for insert
to authenticated
with check (
  auth.uid() = id
  and coalesce(status, 'active') = 'active'
  and (
    role = 'user'
    or (role = 'admin' and lower(email) = 'eduard.ghitun@yahoo.com')
  )
);

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
on public.profiles
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "profiles_update_self_safe" on public.profiles;
create policy "profiles_update_self_safe"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (
  auth.uid() = id
  and role = (select p.role from public.profiles p where p.id = auth.uid())
  and status = (select p.status from public.profiles p where p.id = auth.uid())
);

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
on public.profiles
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (true);

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin"
on public.profiles
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "tickets_select_admin" on public.tickets;
create policy "tickets_select_admin"
on public.tickets
for select
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "tickets_select_own" on public.tickets;
create policy "tickets_select_own"
on public.tickets
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tickets_insert_admin" on public.tickets;
create policy "tickets_insert_admin"
on public.tickets
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "tickets_update_admin" on public.tickets;
create policy "tickets_update_admin"
on public.tickets
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (true);

drop policy if exists "tickets_delete_admin" on public.tickets;
create policy "tickets_delete_admin"
on public.tickets
for delete
to authenticated
using (public.is_admin(auth.uid()));

create or replace function public.admin_list_users()
returns table (
  id uuid,
  email text,
  full_name text,
  avatar_url text,
  role text,
  status text,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  return query
  select p.id, p.email, p.full_name, p.avatar_url, p.role, p.status, p.created_at, p.updated_at
  from public.profiles p
  order by p.created_at desc;
end;
$$;

create or replace function public.admin_update_user_profile(
  target_user_id uuid,
  profile_full_name text default null,
  profile_role text default null,
  profile_status text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  target_profile public.profiles;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  if auth.uid() = target_user_id and profile_status = 'banned' then
    raise exception 'cannot ban self';
  end if;

  update public.profiles
  set full_name = coalesce(profile_full_name, full_name),
      role = case
        when lower(email) = 'eduard.ghitun@yahoo.com' then 'admin'
        else coalesce(profile_role, role)
      end,
      status = case
        when auth.uid() = target_user_id then status
        else coalesce(profile_status, status)
      end,
      is_banned = case
        when auth.uid() = target_user_id then is_banned
        else coalesce(profile_status, status) = 'banned'
      end,
      updated_at = now()
  where id = target_user_id
  returning * into target_profile;

  if target_profile.id is null then
    raise exception 'profile not found';
  end if;

  return target_profile;
end;
$$;

create or replace function public.admin_delete_user_profile(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  if auth.uid() = target_user_id then
    raise exception 'cannot delete self';
  end if;

  delete from public.profiles where id = target_user_id;
end;
$$;

create or replace function public.admin_ban_user(target_user_id uuid)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
begin
  return public.admin_update_user_profile(target_user_id, null, null, 'banned');
end;
$$;

create or replace function public.admin_unban_user(target_user_id uuid)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
begin
  return public.admin_update_user_profile(target_user_id, null, null, 'active');
end;
$$;

grant execute on function public.admin_list_users() to authenticated;
grant execute on function public.admin_update_user_profile(uuid, text, text, text) to authenticated;
grant execute on function public.admin_delete_user_profile(uuid) to authenticated;
grant execute on function public.admin_ban_user(uuid) to authenticated;
grant execute on function public.admin_unban_user(uuid) to authenticated;
grant execute on function public.sync_profile_from_auth(uuid, text, text, text) to authenticated;
