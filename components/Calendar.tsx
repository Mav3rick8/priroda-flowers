"use client";

import Image from "next/image";
import { useState } from "react";
import { asset, bloomsInMonth, monthIn, monthMedia, monthNames, monthShort } from "@/data/bouquets";

// Двенадцать полос-месяцев. Текущий месяц приходит с сервера и открыт сразу,
// поэтому без JavaScript календарь показывает то, что цветёт сейчас.
export function Calendar({ now }: { now: number }) {
  const [open, setOpen] = useState(now);

  return (
    <div className="slices">
      {monthShort.map((label, i) => {
        const month = i + 1;
        const isOpen = month === open;
        const media = monthMedia[i];
        return (
          <div
            key={label}
            className={`slice${isOpen ? " is-open" : ""}`}
            data-now={month === now}
          >
            <button
              type="button"
              className="slice-tab"
              aria-expanded={isOpen}
              aria-controls={`month-${month}`}
              aria-label={`${monthNames[i]}${month === now ? ", сейчас" : ""}`}
              onClick={() => setOpen(month)}
            >
              <span className="slice-label">{label}</span>
            </button>

            {isOpen && (
              <div className="slice-body" id={`month-${month}`}>
                {media.video ? (
                  <video
                    className="slice-media"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={asset("/assets/peony-timelapse-poster.jpg")}
                    aria-label="Раскрывающийся пион, ускоренная съёмка"
                  >
                    <source src={media.video} type="video/webm" />
                  </video>
                ) : (
                  <Image
                    className="slice-media"
                    src={media.photo.src}
                    alt={media.photo.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                  />
                )}
                <p className="slice-name">
                  {monthNames[i]}
                  {month === now ? ", сейчас" : ""}
                </p>
                <div className="slice-panel">
                  <div>
                    <p className="slice-panel-title">Цветы {monthIn[i]}</p>
                    <ul className="slice-flowers">
                      {bloomsInMonth(month).map((f) => (
                        <li key={f.name}>{f.name}</li>
                      ))}
                    </ul>
                  </div>
                  <a className="btn btn-accent" href="#catalog">
                    Букеты
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
