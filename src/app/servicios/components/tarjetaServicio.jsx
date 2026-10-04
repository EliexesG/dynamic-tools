"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export default function TarjetaServicio({ titulo, descripcion }) {
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const descripcionId = useId();

  const handleMostrarTexto = () => {
    setMostrarTexto((valor) => !valor);
  };

  return (
    <article className="mb-6 rounded-xl border border-border bg-surface-muted p-5 shadow-sm">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
        <div className="flex items-center justify-center rounded-lg bg-primary px-4 py-6 text-center md:col-span-4">
          <h2 className="text-h3 font-bold text-white">{titulo}</h2>
        </div>
        <div className="flex items-center justify-center md:col-span-6">
          <p
            id={descripcionId}
            className={`text-justify text-body text-ink transition-all duration-300 ${
              mostrarTexto ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {descripcion}
          </p>
        </div>
        <div className="flex items-center justify-center md:col-span-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-primary/40 px-3 py-1.5 text-small font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            onClick={handleMostrarTexto}
            aria-expanded={mostrarTexto}
            aria-controls={descripcionId}
          >
            {mostrarTexto ? "Ver menos" : "Ver más"}
            <ChevronDown
              aria-hidden="true"
              className={`size-5 transition-transform duration-300 ${
                mostrarTexto ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
