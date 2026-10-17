"use client";

import Image from "next/image";
import { useState } from "react";
import {
  bouquets,
  formatPrice,
  isInSeason,
  occasions,
  whatsappLink,
  type OccasionId,
} from "@/data/bouquets";

// Подбор по поводу: слева поводы, справа два подходящих букета, сначала сезонные.
// Без JavaScript показан повод «День рождения».
export function Occasions({ now }: { now: number }) {
  const [active, setActive] = useState<OccasionId>("birthday");
  const label = occasions.find((o) => o.id === active)?.label ?? "";

  const picks = bouquets
    .filter((b) => b.occasions.includes(active))
    .sort((a, b) => Number(isInSeason(b, now)) - Number(isInSeason(a, now)))
    .slice(0, 2);

  const [main, second] = picks;

  return (
    <div className="diptych">
      <div className="diptych-dark">
        <h2 className="diptych-title">Подберём по поводу</h2>
        <ul className="occasion-list" role="group" aria-label="Повод">
          {occasions.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                className="occasion"
                aria-pressed={active === o.id}
                onClick={() => setActive(o.id)}
              >
                {o.label}
                <span className="occasion-arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="diptych-note">Сначала показываем то, что сейчас в сезоне.</p>
      </div>

      <div className="diptych-light" aria-live="polite">
        <div className="crops">
          {main && (
            <div className="crop-main">
              <Image
                src={main.photo.src}
                alt={main.photo.alt}
                fill
                sizes="(max-width: 900px) 80vw, 30vw"
              />
            </div>
          )}
          {second && (
            <div className="crop-small">
              <Image
                src={second.photo.src}
                alt={second.photo.alt}
                fill
                sizes="(max-width: 900px) 40vw, 15vw"
              />
            </div>
          )}
        </div>

        <div className="picks">
          {picks.map((b) => (
            <div key={b.id} className="pick">
              <p className="pick-name">{b.name}</p>
              <p className="muted">{b.composition}</p>
              <p className="pick-price">
                {formatPrice(b.price)}
                {isInSeason(b, now) && <span className="in-season"> · в сезоне</span>}
              </p>
            </div>
          ))}
          <a
            className="btn btn-accent"
            href={whatsappLink(`Здравствуйте! Подберите, пожалуйста, букет. Повод: ${label}.`)}
          >
            Заказать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
