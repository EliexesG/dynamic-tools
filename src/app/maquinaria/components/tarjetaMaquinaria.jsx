"use client";

import { Expand, Shrink } from "lucide-react";

import Imagen from "@/app/components/Imagen";
import { useState, useEffect, useCallback } from "react";

const botonSecundario =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function TarjetaMaquina({ titulo, descripcion, imagenes }) {
  const [mostrarImagenesCompleto, setMostrarImagenesCompleto] = useState(false);

  const alternarPantallaCompleta = useCallback(() => {
    setMostrarImagenesCompleto((valor) => !valor);
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape" && mostrarImagenesCompleto) {
        event.preventDefault();
        setMostrarImagenesCompleto(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [mostrarImagenesCompleto]);

  useEffect(() => {
    if (mostrarImagenesCompleto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mostrarImagenesCompleto]);

  const contenedorImagenes = mostrarImagenesCompleto
    ? "mt-3 flex flex-wrap items-center justify-center gap-4 border-t border-primary pt-3 pb-3"
    : "mt-3 grid grid-cols-1 items-center justify-center gap-3 border-t border-primary pt-3 pb-3 sm:grid-cols-2";

  return (
    <article className="mb-6 grid grid-cols-1 gap-6 rounded-xl border border-s-4 border-border border-s-primary bg-surface p-5 shadow-sm md:grid-cols-2">
      <div
        className={
          mostrarImagenesCompleto
            ? "fixed inset-0 z-[100] overflow-auto bg-ink/95 p-6"
            : ""
        }
      >
        <div className="pt-2">
          <button
            type="button"
            className={botonSecundario}
            onClick={alternarPantallaCompleta}
            aria-expanded={mostrarImagenesCompleto}
          >
            {mostrarImagenesCompleto ? (
              <Shrink aria-hidden="true" className="size-5" />
            ) : (
              <Expand aria-hidden="true" className="size-5" />
            )}
            <span className="font-bold">
              {mostrarImagenesCompleto ? "Minimizar" : "Maximizar"}
            </span>
          </button>
        </div>
        <div className={contenedorImagenes}>
          {imagenes.map((imagen) => (
            <Imagen
              key={imagen.id}
              className={`rounded p-0 shadow ${
                mostrarImagenesCompleto
                  ? "h-auto w-[65%] object-scale-down"
                  : "h-auto w-full object-cover"
              }`}
              alt={`Imagen de ${titulo} (${imagen.id})`}
              src={imagen.url}
              width={1600}
              height={1201}
              sizes={
                mostrarImagenesCompleto
                  ? "65vw"
                  : "(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 25vw"
              }
            />
          ))}
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        id="contenedorCartaTexto"
      >
        <h2 className="w-full rounded bg-primary p-2 text-center text-h3 font-bold text-white">
          {titulo}
        </h2>
        <p className="mt-4 text-justify text-body text-ink">{descripcion}</p>
      </div>
    </article>
  );
}
