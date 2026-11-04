-- iZamoN: заявки покупателей и подключение Telegram продавца.
-- Выполняется один раз в Supabase: SQL Editor → New query → вставить → Run.
-- Повторный запуск безопасен (ничего не удаляет и не дублирует).

-- Заявки (заказать, забронировать, вопрос). Номер телефона покупателя виден только продавцу.
create table if not exists public.orders (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  ad_id        bigint      not null,
  seller_id    text        not null,
  ad_title     text,
  kind         text        not null default 'order',   -- order | booking | other
  buyer_name   text        not null,
  buyer_phone  text        not null,
  note         text,
  lang         text,
  status       text        not null default 'new',     -- new | done
  notified     boolean     not null default false      -- ушло ли сообщение продавцу в Telegram
);
create index if not exists orders_seller_idx on public.orders (seller_id, created_at desc);
create index if not exists orders_ad_idx     on public.orders (ad_id, created_at desc);

-- Telegram продавца: одноразовый код для подключения и номер чата после подключения.
create table if not exists public.seller_tg (
  user_id    text primary key,
  chat_id    bigint,
  code       text,
  code_at    timestamptz,
  linked_at  timestamptz
);
create index if not exists seller_tg_code_idx on public.seller_tg (code);
create index if not exists seller_tg_chat_idx on public.seller_tg (chat_id);

-- Закрываем таблицы от публичного ключа: читать и писать их может только наш сервер (service_role).
alter table public.orders    enable row level security;
alter table public.seller_tg enable row level security;
