// Каталог, сезонность и медиа магазина «Природа».
// Образцы: названия, составы, цены и сроки стояния нужно заменить перед запуском.
// Сезонность — ориентир для средней полосы; уточните у поставщика.

export type OccasionId = "wedding" | "birthday" | "apology" | "just";

export const occasions: { id: OccasionId; label: string }[] = [
  { id: "wedding", label: "Свадьба" },
  { id: "birthday", label: "День рождения" },
  { id: "apology", label: "Извинение" },
  { id: "just", label: "Просто так" },
];

export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// «в октябре», «в мае» — для подписей.
export const monthIn = [
  "в январе",
  "в феврале",
  "в марте",
  "в апреле",
  "в мае",
  "в июне",
  "в июле",
  "в августе",
  "в сентябре",
  "в октябре",
  "в ноябре",
  "в декабре",
];

export const monthShort = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

// Путь к файлу с учётом подпапки GitHub Pages (пусто при локальном запуске).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export type Photo = { src: string; width: number; height: number; alt: string };

// Фотографии цветов из открытых собраний (источники в public/assets/credits.json).
// Это фото цветов, а не готовых букетов магазина: замените их съёмкой своих букетов.
export const photos = {
  dahlia: {
    src: asset("/assets/dahlia.jpg"),
    width: 3840,
    height: 2642,
    alt: "Тёмно-красные георгины в саду",
  },
  peony: { src: asset("/assets/peony.jpg"), width: 3456, height: 3456, alt: "Розовый пион крупным планом" },
  tulips: {
    src: asset("/assets/tulips.jpg"),
    width: 3840,
    height: 5760,
    alt: "Красные тюльпаны в корзине",
  },
  rose: {
    src: asset("/assets/white-rose.jpg"),
    width: 3840,
    height: 2560,
    alt: "Белая роза крупным планом",
  },
  amaryllis: {
    src: asset("/assets/amaryllis.jpg"),
    width: 3197,
    height: 4491,
    alt: "Красный амариллис",
  },
  meadow: {
    src: asset("/assets/chamomile-cornflowers.jpg"),
    width: 3840,
    height: 2880,
    alt: "Ромашки и васильки в поле",
  },
  eustoma: {
    src: asset("/assets/eustoma-pink.jpg"),
    width: 3840,
    height: 2560,
    alt: "Розовая эустома крупным планом",
  },
  spruce: {
    src: asset("/assets/spruce-snow.jpg"),
    width: 1920,
    height: 1440,
    alt: "Еловые ветки под снегом",
  },
  market: {
    src: asset("/assets/flower-market-and-butter-tower-rouen.jpg"),
    width: 1600,
    height: 2352,
    alt: "Джозеф Пеннелл, «Цветочный рынок в Руане», офорт 1907 года",
  },
  greenhouse: {
    src: asset("/assets/the-royal-greenhouses-of-laeken-1.jpg"),
    width: 1200,
    height: 1600,
    alt: "Старая стеклянная оранжерея с пальмами",
  },
} satisfies Record<string, Photo>;

// Номера месяцев: 1 — январь ... 12 — декабрь.
export const blooms: { name: string; months: number[] }[] = [
  { name: "Амариллис", months: [12, 1, 2, 3] },
  { name: "Гиацинты", months: [3, 4] },
  { name: "Тюльпаны", months: [3, 4, 5] },
  { name: "Ранункулюсы", months: [4, 5, 6] },
  { name: "Пионы", months: [5, 6] },
  { name: "Ромашки и васильки", months: [6, 7, 8] },
  { name: "Эустома", months: [6, 7, 8, 9, 10] },
  { name: "Георгины", months: [8, 9, 10, 11] },
  { name: "Сухоцветы", months: [9, 10, 11] },
  { name: "Ветки и хвоя", months: [11, 12, 1, 2] },
  { name: "Розы оранжерейные", months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

// Картинка развёрнутого месяца в календаре. В мае и июне — съёмка раскрывающегося пиона.
export const monthMedia: { photo: Photo; video?: string }[] = [
  { photo: photos.spruce },
  { photo: photos.amaryllis },
  { photo: photos.tulips },
  { photo: photos.tulips },
  { photo: photos.peony, video: asset("/assets/peony-timelapse.webm") },
  { photo: photos.peony, video: asset("/assets/peony-timelapse.webm") },
  { photo: photos.meadow },
  { photo: photos.meadow },
  { photo: photos.eustoma },
  { photo: photos.dahlia },
  { photo: photos.dahlia },
  { photo: photos.spruce },
];

export type Bouquet = {
  id: string;
  name: string;
  main: string; // название цветка из blooms, по нему определяется сезон
  composition: string;
  price: number;
  vaseDays: number;
  occasions: OccasionId[];
  photo: Photo;
};

export const bouquets: Bouquet[] = [
  {
    id: "osennij-lug",
    name: "Осенний луг",
    main: "Георгины",
    composition: "Георгины, сухоцветы, ветки шиповника",
    price: 4200,
    vaseDays: 7,
    occasions: ["birthday", "just"],
    photo: photos.dahlia,
  },
  {
    id: "utrennyaya-rosa",
    name: "Утренняя роса",
    main: "Пионы",
    composition: "Пионы, ранункулюсы, эвкалипт",
    price: 4900,
    vaseDays: 7,
    occasions: ["birthday", "just"],
    photo: photos.peony,
  },
  {
    id: "belaya-noch",
    name: "Белая ночь",
    main: "Розы оранжерейные",
    composition: "Кремовые розы, гипсофила, зелень",
    price: 6500,
    vaseDays: 10,
    occasions: ["wedding", "apology"],
    photo: photos.rose,
  },
  {
    id: "tyulpanovyy-polden",
    name: "Тюльпановый полдень",
    main: "Тюльпаны",
    composition: "Тюльпаны, гиацинты, ветка бузины",
    price: 3200,
    vaseDays: 8,
    occasions: ["apology", "just"],
    photo: photos.tulips,
  },
  {
    id: "svadebnaya-arka",
    name: "Свадебная арка",
    main: "Эустома",
    composition: "Эустома, пионовидные розы, зелень",
    price: 12900,
    vaseDays: 8,
    occasions: ["wedding"],
    photo: photos.eustoma,
  },
  {
    id: "zimnij-sad",
    name: "Зимний сад",
    main: "Амариллис",
    composition: "Амариллис, ветки хвои, эвкалипт",
    price: 5200,
    vaseDays: 9,
    occasions: ["birthday", "just"],
    photo: photos.amaryllis,
  },
  {
    id: "polevaya",
    name: "Полевая",
    main: "Ромашки и васильки",
    composition: "Ромашки, васильки, колосья",
    price: 2800,
    vaseDays: 6,
    occasions: ["just"],
    photo: photos.meadow,
  },
];

export function isInSeason(bouquet: Bouquet, month: number) {
  const flower = blooms.find((b) => b.name === bouquet.main);
  return flower ? flower.months.includes(month) : false;
}

export function bloomsInMonth(month: number) {
  return blooms.filter((b) => b.months.includes(month));
}

export function seasonLabel(main: string) {
  const flower = blooms.find((b) => b.name === main);
  if (!flower) return "";
  if (flower.months.length === 12) return "круглый год";
  const first = flower.months[0];
  const last = flower.months[flower.months.length - 1];
  return `${monthNames[first - 1].toLowerCase()}–${monthNames[last - 1].toLowerCase()}`;
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

// Текущий месяц по часовому поясу магазина. Страница пересобирается раз в час,
// поэтому «сейчас в цвету» верно и без JavaScript.
export function currentMonth(timeZone = "Europe/Moscow") {
  const m = new Intl.DateTimeFormat("en-US", { month: "numeric", timeZone }).format(new Date());
  return Number(m);
}

// Данные магазина. Замените на свои перед запуском.
export const shop = {
  address: "ул. Садовая, 12",
  city: "Москва",
  phone: "+7 (900) 000-00-00",
  hours: "Ежедневно, 9:00–21:00",
  whatsapp: "79000000000", // номер без плюса и пробелов
};

export function whatsappLink(text: string) {
  return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function orderLink(bouquet: Bouquet) {
  return whatsappLink(
    `Здравствуйте! Хочу заказать букет «${bouquet.name}» (${formatPrice(bouquet.price)}).`,
  );
}

export const mapLink = `https://yandex.ru/maps/?text=${encodeURIComponent(
  `${shop.city}, ${shop.address}`,
)}`;
