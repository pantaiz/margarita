# Свитич Маргарита — портфолио

Портфолио продуктового дизайнера на Next.js + TypeScript + CSS Modules.

## Запуск

```bash
npm install
npm run setup:fonts   # один раз после clone (Benzin, Zeequada, Gilroy из ~/Downloads)
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Сборка и деплой на Vercel

```bash
npm run build
```

1. Подключи репозиторий к Vercel — zero-config для Next.js.
2. В Vercel Dashboard → Settings → Environment Variables добавь:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Скопируй из [`.env.example`](.env.example). Без этой переменной canonical, sitemap и Open Graph будут указывать на fallback-домен.

## Ассеты

Изображения лежат в `public/assets/`. Чтобы перескачать из Figma:

```bash
npm run setup:assets
```

## Шрифты

Self-hosted в `public/fonts/`:

- **Gilroy** — Regular + Medium из `Gilroy.zip`
- **Benzin** — Medium из `font.zip`
- **ZeeQuada** — Regular из `Zeequada.zip`

Положи архивы в `~/Downloads` и запусти:

```bash
npm run setup:fonts
```

Или укажи пути через `BENZIN_ZIP`, `ZEEQUADA_ZIP`, `GILROY_ZIP`.

## Структура

- `components/` — UI и секции
- `lib/constants.ts` — контакты, кейсы, навыки
- `hooks/` — скролл хедера, рисование
- `app/` — страницы, SEO, sitemap, icon, opengraph-image
