"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

import Imagen from "@/app/components/Imagen";

/*
 * Shared, dependency-free carousel used by the machinery and services galleries
 * (migration plan SOL-47, milestone "Carousels + videos" / SOL-56).
 *
 * Design contract (Iris, SOL-49 → token sheet SOL-50 §12.10):
 *  - aspect-ratio-aware stage with `object-fit: cover` (no fixed dark letterbox);
 *  - indicators below the stage, never overlaid on the photo;
 *  - no autoplay (WCAG 2.2.2); the global reduced-motion reset also applies;
 *  - keyboard (←/→/Home/End), swipe (>= 50px), visible focus and an
 *    `aria-live` counter, with `aria-roledescription="carousel"`.
 *
 * The former `carouselMaquinaria` / `carouselServicios` Bootstrap widgets are
 * rebuilt on top of this component; they no longer require Bootstrap JS.
 */

const SWIPE_MIN = 50;

export default function Carrusel({
  items,
  ariaLabel = "Galería de imágenes",
  sizes = "(max-width: 767px) 100vw, 60vw",
  imageWidth = 1000,
  imageHeight = 1000,
  permitirPantallaCompleta = false,
  className = "",
}) {
  const total = items?.length ?? 0;
  const [indice, setIndice] = useState(0);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  const disparadorRef = useRef(null);
  const toqueRef = useRef(null);

  const mover = useCallback(
    (delta) => {
      if (total < 2) return;
      setIndice((actual) => (actual + delta + total) % total);
    },
    [total]
  );

  const irA = useCallback(
    (destino) => {
      if (total < 2) return;
      setIndice((destino + total) % total);
    },
    [total]
  );

  const manejarTecla = useCallback(
    (evento) => {
      if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        mover(-1);
      } else if (evento.key === "ArrowRight") {
        evento.preventDefault();
        mover(1);
      } else if (evento.key === "Home") {
        evento.preventDefault();
        irA(0);
      } else if (evento.key === "End") {
        evento.preventDefault();
        irA(total - 1);
      }
    },
    [mover, irA, total]
  );

  const alternarPantallaCompleta = useCallback(() => {
    setPantallaCompleta((activo) => {
      if (!activo) {
        disparadorRef.current = document.activeElement;
      }
      return !activo;
    });
  }, []);

  useEffect(() => {
    if (!pantallaCompleta) {
      if (disparadorRef.current) {
        disparadorRef.current.focus?.();
        disparadorRef.current = null;
      }
      return undefined;
    }

    const manejarEscape = (evento) => {
      if (evento.key === "Escape") {
        evento.preventDefault();
        setPantallaCompleta(false);
      }
    };

    document.addEventListener("keydown", manejarEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", manejarEscape);
      document.body.style.overflow = "";
    };
  }, [pantallaCompleta]);

  const iniciarToque = (evento) => {
    const toque = evento.changedTouches?.[0];
    if (!toque) return;
    toqueRef.current = { x: toque.clientX, y: toque.clientY };
  };

  const terminarToque = (evento) => {
    const inicio = toqueRef.current;
    toqueRef.current = null;
    const toque = evento.changedTouches?.[0];
    if (!inicio || !toque) return;
    const dx = toque.clientX - inicio.x;
    const dy = toque.clientY - inicio.y;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      mover(dx < 0 ? 1 : -1);
    }
  };

  if (total === 0) {
    return null;
  }

  const claseEscenario = pantallaCompleta
    ? "relative h-full w-full overflow-hidden rounded-xl bg-surface-inset"
    : "relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-inset lg:aspect-[16/9]";

  const claseGrupo = pantallaCompleta
    ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-[#101010] p-4"
    : "";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={manejarTecla}
      className={`${claseGrupo} ${className}`.trim()}
      data-carrusel
    >
      <div
        className={claseEscenario}
        onTouchStart={iniciarToque}
        onTouchEnd={terminarToque}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-in-out-soft"
          style={{ transform: `translateX(-${indice * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.id ?? item.url ?? i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={i !== indice}
              className="relative h-full w-full shrink-0"
            >
              <Imagen
                src={item.url}
                alt={item.alt ?? `Imagen ${i + 1}`}
                width={imageWidth}
                height={imageHeight}
                sizes={sizes}
                priority={i === 0}
                className={`h-full w-full ${
                  pantallaCompleta ? "object-contain" : "object-cover"
                }`}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label="Imagen anterior"
              className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label="Imagen siguiente"
              className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}

        {permitirPantallaCompleta && (
          <button
            type="button"
            onClick={alternarPantallaCompleta}
            aria-label={
              pantallaCompleta
                ? "Salir de pantalla completa"
                : "Ver en pantalla completa"
            }
            aria-pressed={pantallaCompleta}
            className="absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {pantallaCompleta ? (
              <Minimize aria-hidden="true" className="size-5" />
            ) : (
              <Maximize aria-hidden="true" className="size-5" />
            )}
          </button>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id ?? item.url ?? i}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === indice ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === indice
                  ? "w-6 bg-secondary"
                  : "w-2 bg-border hover:bg-secondary/60"
              }`}
            />
          ))}
        </div>
      )}

      <span className="sr-only" aria-live="polite">
        {`Imagen ${indice + 1} de ${total}`}
      </span>
    </div>
  );
}
