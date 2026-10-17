# Природа

Сайт магазина сезонных букетов на Next.js (App Router, TypeScript).

- **Сайт:** https://mav3rick8.github.io/priroda-flowers/
- Календарь «сейчас в цвету» считается по текущему месяцу. Сайт пересобирается каждую ночь (см. `.github/workflows/pages.yml`).

## Запуск локально

```bash
npm install
npm run dev
```

## Что заменить перед запуском

Все данные магазина (адрес, телефон, номер WhatsApp, часы, букеты, цены, составы) — образцы. Они лежат в `data/bouquets.ts`, объект `shop`.

## Изображения

Фотографии взяты из открытых коллекций (Art Institute of Chicago, Wikimedia Commons), авторы и лицензии перечислены в футере и в `public/assets/credits.json`.
