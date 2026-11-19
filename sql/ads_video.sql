-- Видео в объявлениях iZamoN: одна колонка со ссылкой на видео (хранится в Supabase Storage, корзина ad-videos).
-- Выполнить один раз: Supabase → SQL Editor → вставить эту строку → Run.
alter table public.ads add column if not exists video_url text;
