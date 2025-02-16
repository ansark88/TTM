-- ref: https://zenn.dev/n_o_n_a_m_e/books/de49cce3d044c8/viewer/71a103#2.-rls-%E3%81%AE%E8%A8%AD%E5%AE%9A
alter table public.members enable row level security;
create policy "allow select for all" on public.members for select using (true);
create policy "allow update for users themselves" on public.members for update using (auth.uid() = user_id);

alter table public.posts enable row level security;
create policy "allow select for all" on public.posts for select using (true);
create policy "allow insert for users themselves" on public.posts for insert with check (
  member_id in (
    select id 
    from public.members 
    where user_id = auth.uid()
  )
);
create policy "allow update for users themselves" on public.posts for update using (
  member_id in (
    select id 
    from public.members 
    where user_id = auth.uid()
  )
);
create policy "allow delete for users themselves" on public.posts for delete using (
  member_id in (
    select id 
    from public.members 
    where user_id = auth.uid()
  )
);

-- usersの作成時にmemberを作成するtrigger
create or replace function public.create_member_on_user_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.members (
    user_id,
    name
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', new.email)
  );
  return new;
exception
  when unique_violation then
    -- 既に存在する場合は無視
    return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_member_on_user_created();