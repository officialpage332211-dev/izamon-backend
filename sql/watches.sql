-- iZamoN: сохранённые поиски с уведомлением в Telegram.
-- Выполняется один раз в Supabase: SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен (ничего не удаляет и не дублирует).

create table if not exists public.watches (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  prompt      text        not null,               -- запрос так, как его отправил сайт (раздел или набранные слова)
  lang        text,
  city        text,                               -- выбранный город (dushanbe, khujand …) или пусто
  pmin        integer,                            -- цена «от», сомони
  pmax        integer,                            -- цена «до», сомони
  code        text,                               -- одноразовый код для кнопки Start в Telegram
  code_at     timestamptz,
  chat_id     bigint,                             -- чат Telegram, куда слать новые объявления
  seen        text[]      not null default '{}',  -- ссылки уже показанных объявлений
  checked_at  timestamptz,
  active      boolean     not null default true
);
create index if not exists watches_code_idx on public.watches (code);
create index if not exists watches_chat_idx on public.watches (chat_id);
create index if not exists watches_due_idx  on public.watches (active, checked_at);

-- Только наш сервер (service_role) читает и пишет эту таблицу.
alter table public.watches enable row level security;
