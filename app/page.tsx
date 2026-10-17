import Image from "next/image";
import { Calendar } from "@/components/Calendar";
import { Occasions } from "@/components/Occasions";
import { Reveal } from "@/components/Reveal";
import {
  asset,
  bloomsInMonth,
  bouquets,
  currentMonth,
  formatPrice,
  isInSeason,
  mapLink,
  monthIn,
  monthNames,
  orderLink,
  photos,
  seasonLabel,
  shop,
  whatsappLink,
} from "@/data/bouquets";
import credits from "@/public/assets/credits.json";

// Сайт собирается статически. Workflow пересобирает его каждую ночь, чтобы «сейчас в цвету» было верно.

const monthGen = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// До какого месяца цветок ещё будет в продаже.
function untilNote(months: number[], now: number) {
  if (months.length === 12) return "круглый год";
  let last = now;
  for (let i = 0; i < 11; i++) {
    const next = (last % 12) + 1;
    if (!months.includes(next)) break;
    last = next;
  }
  return last === now ? "последний месяц" : `до ${monthGen[last - 1]}`;
}

// Образцы: ответы нужно сверить с реальными условиями магазина.
const faqs = [
  {
    q: "Как ухаживать за букетом?",
    a: "Меняйте воду каждый день, подрезайте стебли наискось на сантиметр и держите букет подальше от батарей и фруктов.",
  },
  {
    q: "Как оплатить?",
    a: "Наличными или картой при получении, либо переводом заранее. Онлайн-оплаты на сайте нет.",
  },
  {
    q: "Можно ли вернуть букет?",
    a: "Если букет не соответствует заказу, заменим его или вернём деньги в день доставки.",
  },
  {
    q: "Можно ли заказать на нужную дату?",
    a: "Да, на сегодня, на завтра или на любой день вперёд. Напишите нам в WhatsApp.",
  },
  {
    q: "Что если цветка нет в сезон?",
    a: "Заменим его похожим по цвету и сроку стояния и предупредим до сборки.",
  },
  {
    q: "Что входит в букет?",
    a: "Цветы, упаковка, открытка и инструкция по уходу. Вазу добавим по желанию, за отдельную плату.",
  },
];

const nav = [
  { href: "#calendar", label: "Календарь" },
  { href: "#catalog", label: "Букеты" },
  { href: "#occasions", label: "Поводы" },
  { href: "#delivery", label: "Доставка" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Контакты" },
];

// Пропорции кадров в каталоге: разные размеры дают журнальный разворот.
const frames = ["4 / 5", "1 / 1", "3 / 4", "3 / 4", "4 / 5", "4 / 5", "1 / 1"];

export default function Home() {
  const now = currentMonth();
  const nowFlowers = bloomsInMonth(now);

  return (
    <>
      {/* 1. Первый экран: фото на всю ширину, заголовок внизу слева, что цветёт справа */}
      <section className="hero" id="top">
        <div className="hero-frame">
          <Image
            className="hero-img"
            src={photos.dahlia.src}
            alt={photos.dahlia.alt}
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <header className="nav">
            <a className="wordmark" href="#top">
              Природа
            </a>
            <nav className="nav-links" aria-label="Основная навигация">
              {nav.slice(0, 4).map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
            <a className="btn btn-paper btn-small" href="#catalog">
              Заказать
            </a>
          </header>
          <div className="hero-copy">
            <h1 className="hero-title">
              Сейчас в цвету
              <br />
              {monthNames[now - 1].toLowerCase()}
            </h1>
            <p className="hero-sub">
              Собираем букеты только из того, что цветёт в этом месяце.
            </p>
            <div className="btn-row">
              <a className="btn btn-accent" href="#catalog">
                Выбрать букет
              </a>
              <a className="link link-light" href="#calendar">
                Календарь сезона
              </a>
            </div>
          </div>
        </div>
        <aside className="now-panel" aria-labelledby="now-title">
          <h2 id="now-title" className="now-title">
            В цвету {monthIn[now - 1]}
          </h2>
          <ul className="now-list">
            {nowFlowers.map((f) => (
              <li key={f.name}>
                <span>{f.name}</span>
                <span className="muted">{untilNote(f.months, now)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* 2. Календарь сезона: двенадцать полос, текущий месяц раскрыт */}
      <section className="section wrap" id="calendar">
        <Reveal>
          <h2 className="h2">Календарь сезона</h2>
          <p className="section-sub">
            Что цветёт в каждом месяце и из чего мы собираем букеты. Нажмите на месяц, чтобы
            посмотреть.
          </p>
        </Reveal>
        <Reveal delay={90}>
          <Calendar now={now} />
        </Reveal>
      </section>

      {/* 3. Каталог: журнальный разворот из кадров разного размера */}
      <section className="section wrap" id="catalog">
        <div className="catalog">
          <Reveal className="catalog-head">
            <h2 className="h2">Букеты</h2>
            <p className="section-sub">
              Семь букетов. У каждого указаны состав, цена, срок стояния в вазе и месяцы, когда его
              цветы в сезоне.
            </p>
          </Reveal>
          {bouquets.map((b, i) => (
            <Reveal key={b.id} className={`item item-${i + 1}`} delay={(i % 3) * 80}>
              <div className="frame">
                <div className="frame-media" style={{ aspectRatio: frames[i] }}>
                  <Image
                    src={b.photo.src}
                    alt={b.photo.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
              </div>
              <h3 className="item-name">{b.name}</h3>
              <p className="muted">{b.composition}</p>
              <p className="muted">
                В сезоне: {seasonLabel(b.main)} · стоит в вазе {b.vaseDays} дн.
              </p>
              <p className="item-buy">
                <span className="item-price">{formatPrice(b.price)}</span>
                <a className="link link-accent" href={orderLink(b)}>
                  Заказать →
                </a>
              </p>
              {isInSeason(b, now) && <p className="in-season">В сезоне сейчас</p>}
            </Reveal>
          ))}
        </div>
        <p className="catalog-note muted">
          На фотографиях цветы сезона из открытых фотоархивов, а не готовые букеты магазина.
        </p>
      </section>

      {/* 4. Поводы: две цветные половины */}
      <section id="occasions">
        <Occasions now={now} />
      </section>

      {/* 5. Доставка: короткое обещание и чек */}
      <section className="section wrap delivery" id="delivery">
        <Reveal>
          <h2 className="statement">
            Сегодня, если
            <br />
            закажете до 14:00
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <div className="slip">
            <div className="leader">
              <span>Заказ до 14:00</span>
              <span>сегодня</span>
            </div>
            <div className="leader">
              <span>Заказ после 14:00</span>
              <span>завтра</span>
            </div>
            <div className="leader">
              <span>Центр города</span>
              <span>400 ₽</span>
            </div>
            <div className="leader">
              <span>Окраины</span>
              <span>700 ₽</span>
            </div>
            <div className="leader">
              <span>Самовывоз</span>
              <span>бесплатно</span>
            </div>
            <p className="slip-total">В каждом букете открытка и инструкция по уходу</p>
          </div>
          <a className="link" href="#faq">
            Оплата и возврат
          </a>
        </Reveal>
      </section>

      {/* 6. Вопросы: картинки слева, ответы справа */}
      <section className="section faq-section" id="faq">
        <div className="faq-split">
          <div className="faq-media">
            <div className="faq-tall">
              <Image
                src={photos.market.src}
                alt={photos.market.alt}
                fill
                sizes="(max-width: 900px) 90vw, 32vw"
              />
            </div>
            <div className="faq-small">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset("/assets/peony-timelapse-poster.jpg")}
                aria-label="Раскрывающийся пион, ускоренная съёмка"
              >
                <source src={asset("/assets/peony-timelapse.webm")} type="video/webm" />
              </video>
            </div>
          </div>
          <div className="faq-body">
            <Reveal>
              <h2 className="h2">Вопросы</h2>
            </Reveal>
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <a
              className="btn btn-paper"
              href={whatsappLink("Здравствуйте! У меня вопрос о букете.")}
            >
              Задать вопрос в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. Контакты: бенто-сетка */}
      <section className="section wrap" id="contact">
        <div className="bento">
          <a className="tile-map" href={mapLink} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="600" height="600" fill="#DCE2D1" />
              <g fill="#B9C4A6">
                <rect x="30" y="40" width="150" height="110" />
                <rect x="220" y="20" width="120" height="150" />
                <rect x="380" y="50" width="190" height="90" />
                <rect x="40" y="200" width="110" height="170" />
                <rect x="410" y="190" width="160" height="160" />
                <rect x="30" y="420" width="190" height="140" />
                <rect x="260" y="430" width="120" height="150" />
                <rect x="420" y="400" width="150" height="170" />
              </g>
              <rect x="190" y="210" width="190" height="170" fill="#6E7F5A" />
              <circle cx="285" cy="295" r="14" fill="#B8433A" />
            </svg>
            <span className="map-caption">Открыть в Яндекс Картах →</span>
          </a>
          <div className="tile-dark">
            <h2 className="h2">Приходите или пишите</h2>
          </div>
          <div className="tile-pair">
            <div className="tile">
              <p className="tile-label">Адрес</p>
              <p>
                {shop.city}, {shop.address}
              </p>
            </div>
            <div className="tile">
              <p className="tile-label">Часы работы</p>
              <p>{shop.hours}</p>
            </div>
          </div>
          <a className="tile-cta" href={whatsappLink("Здравствуйте! Хочу заказать букет.")}>
            <span className="tile-cta-title">Написать в WhatsApp →</span>
            <span>{shop.phone}</span>
          </a>
        </div>
      </section>

      {/* 8. Футер: фотография оранжереи и название на всю ширину */}
      <footer className="footer">
        <Image
          className="footer-img"
          src={photos.greenhouse.src}
          alt={photos.greenhouse.alt}
          fill
          sizes="100vw"
        />
        <div className="footer-top">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <ul className="footer-contacts">
            <li>
              {shop.city}, {shop.address}
            </li>
            <li>
              <a href={`tel:${shop.phone.replace(/[^\d+]/g, "")}`}>{shop.phone}</a>
            </li>
            <li>{shop.hours}</li>
          </ul>
        </div>
        <div>
          <p className="footer-name">Природа</p>
          <p className="credits">
            Изображения: {credits.map((c) => c.credit).join(" · ")}.
          </p>
        </div>
      </footer>
    </>
  );
}
