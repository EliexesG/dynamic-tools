"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./galeriaImagenes.css";
import Imagen from "@/app/components/Imagen";

const GRID_SIZES =
  "(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 33vw";
const LIGHTBOX_SIZES = "(max-width: 1024px) 100vw, 1024px";
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.5;
const SWIPE_MIN = 50;

export default function GaleriaImagenes({ imagenes }) {
  const [indiceActivo, setIndiceActivo] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [desplazamiento, setDesplazamiento] = useState({ x: 0, y: 0 });

  const dialogoRef = useRef(null);
  const cerrarRef = useRef(null);
  const disparadorRef = useRef(null);
  const arrastreRef = useRef(null);
  const toqueRef = useRef(null);

  const total = imagenes.length;
  const abierto = indiceActivo !== null;

  const cerrar = useCallback(() => {
    setIndiceActivo(null);
    setZoom(1);
    setDesplazamiento({ x: 0, y: 0 });
  }, []);

  const irA = useCallback(
    (delta) => {
      setZoom(1);
      setDesplazamiento({ x: 0, y: 0 });
      setIndiceActivo((actual) =>
        actual === null ? actual : (actual + delta + total) % total
      );
    },
    [total]
  );

  const anterior = useCallback(() => irA(-1), [irA]);
  const siguiente = useCallback(() => irA(1), [irA]);

  const cambiarZoom = useCallback((delta) => {
    setZoom((actual) => Math.min(ZOOM_MAX, Math.max(1, actual + delta)));
  }, []);

  useEffect(() => {
    if (zoom === 1) {
      setDesplazamiento({ x: 0, y: 0 });
    }
  }, [zoom]);

  const abrir = (indice) => {
    disparadorRef.current = document.activeElement;
    setZoom(1);
    setDesplazamiento({ x: 0, y: 0 });
    setIndiceActivo(indice);
  };

  useEffect(() => {
    if (!abierto) {
      return undefined;
    }

    const manejarTecla = (evento) => {
      if (evento.key === "Escape") {
        evento.preventDefault();
        cerrar();
        return;
      }
      if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        anterior();
        return;
      }
      if (evento.key === "ArrowRight") {
        evento.preventDefault();
        siguiente();
        return;
      }
      if (evento.key === "+" || evento.key === "=") {
        evento.preventDefault();
        cambiarZoom(ZOOM_STEP);
        return;
      }
      if (evento.key === "-" || evento.key === "_") {
        evento.preventDefault();
        cambiarZoom(-ZOOM_STEP);
        return;
      }
      if (evento.key === "Tab") {
        const enfoqueables = dialogoRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!enfoqueables || enfoqueables.length === 0) {
          return;
        }
        const primero = enfoqueables[0];
        const ultimo = enfoqueables[enfoqueables.length - 1];
        const activo = document.activeElement;
        if (evento.shiftKey && activo === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && activo === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    };

    document.addEventListener("keydown", manejarTecla);
    return () => document.removeEventListener("keydown", manejarTecla);
  }, [abierto, cerrar, anterior, siguiente, cambiarZoom]);

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
      cerrarRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (disparadorRef.current) {
        disparadorRef.current.focus();
        disparadorRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const iniciarArrastre = (evento) => {
    if (zoom <= 1) {
      return;
    }
    arrastreRef.current = {
      x: evento.clientX,
      y: evento.clientY,
      inicioX: desplazamiento.x,
      inicioY: desplazamiento.y,
    };
    evento.currentTarget.setPointerCapture?.(evento.pointerId);
  };

  const arrastrar = (evento) => {
    if (!arrastreRef.current) {
      return;
    }
    setDesplazamiento({
      x: arrastreRef.current.inicioX + (evento.clientX - arrastreRef.current.x),
      y: arrastreRef.current.inicioY + (evento.clientY - arrastreRef.current.y),
    });
  };

  const terminarArrastre = () => {
    arrastreRef.current = null;
  };

  const iniciarToque = (evento) => {
    if (zoom > 1) {
      return;
    }
    const toque = evento.changedTouches[0];
    toqueRef.current = { x: toque.clientX, y: toque.clientY };
  };

  const terminarToque = (evento) => {
    if (zoom > 1 || !toqueRef.current) {
      return;
    }
    const toque = evento.changedTouches[0];
    const dx = toque.clientX - toqueRef.current.x;
    const dy = toque.clientY - toqueRef.current.y;
    toqueRef.current = null;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        siguiente();
      } else {
        anterior();
      }
    }
  };

  const obtenerAlt = (imagen) => imagen.alt ?? `Imagen de galería ${imagen.id}`;
  const imagenActiva = abierto ? imagenes[indiceActivo] : null;
  const altActivo = imagenActiva ? obtenerAlt(imagenActiva) : "";

  return (
    <section>
      <h2 className="mb-12 rounded-md bg-primary p-4 text-center font-bold text-white">
        Imágenes (Trabajos)
      </h2>
      <div className="grid grid-cols-1 gap-y-6 bg-gray-50 sm:grid-cols-2 md:grid-cols-3">
        {imagenes.map((imagen, indice) => {
          const alt = obtenerAlt(imagen);
          return (
            <div key={imagen.id}>
              <button
                type="button"
                className="galeriaGridItem"
                onClick={() => abrir(indice)}
                aria-label={`Ampliar ${alt}`}
              >
                <Imagen
                  src={imagen.url}
                  className="galeriaMiniatura"
                  width={1000}
                  height={1000}
                  alt=""
                  sizes={GRID_SIZES}
                />
              </button>
            </div>
          );
        })}
      </div>

      {abierto && (
        <div
          className="galeriaLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes de la galería"
          ref={dialogoRef}
        >
          <div className="galeriaLightboxBarra">
            <span className="galeriaLightboxContador" aria-live="polite">
              {indiceActivo + 1} / {total}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="galeriaLightboxBoton"
                onClick={() => cambiarZoom(-ZOOM_STEP)}
                disabled={zoom <= 1}
                aria-label="Reducir zoom"
              >
                −
              </button>
              <button
                type="button"
                className="galeriaLightboxBoton"
                onClick={() => cambiarZoom(ZOOM_STEP)}
                disabled={zoom >= ZOOM_MAX}
                aria-label="Aumentar zoom"
              >
                +
              </button>
              <button
                type="button"
                className="galeriaLightboxBoton"
                onClick={cerrar}
                ref={cerrarRef}
                aria-label="Cerrar visor"
              >
                ✕
              </button>
            </div>
          </div>

          <div
            className="galeriaLightboxEscenario"
            onPointerDown={iniciarArrastre}
            onPointerMove={arrastrar}
            onPointerUp={terminarArrastre}
            onPointerCancel={terminarArrastre}
            onTouchStart={iniciarToque}
            onTouchEnd={terminarToque}
          >
            <button
              type="button"
              className="galeriaLightboxBoton galeriaLightboxFlecha prev"
              onClick={anterior}
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <Imagen
              src={imagenActiva.url}
              alt={altActivo}
              width={1600}
              height={1600}
              sizes={LIGHTBOX_SIZES}
              className={`galeriaLightboxImagen${zoom > 1 ? " zoomed" : ""}`}
              style={{
                transform: `translate(${desplazamiento.x}px, ${desplazamiento.y}px) scale(${zoom})`,
              }}
            />
            <button
              type="button"
              className="galeriaLightboxBoton galeriaLightboxFlecha next"
              onClick={siguiente}
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>

          <p className="galeriaLightboxPie mb-0">{altActivo}</p>
        </div>
      )}
    </section>
  );
}
