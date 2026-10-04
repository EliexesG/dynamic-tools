import CarouselMaquinaria from "./carouselMaquinaria";

import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import Imagen from "@/app/components/Imagen";

const botonSecundario =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function TarjetaMaquinariaInicio({
  maquina,
  className,
  idNumero,
}) {
  return (
    <article className={className}>
      <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-sm transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        <div className="mb-4 overflow-hidden rounded-lg">
          {maquina.imagenes.length > 1 && (
            <CarouselMaquinaria
              id={`carouselMaquinaria${idNumero}`}
              galeria={maquina.imagenes}
            />
          )}
          {maquina.imagenes.length < 2 && (
            <Imagen
              className="h-48 w-full object-cover"
              src={maquina.imagenes[0].url}
              alt={`Imagen de ${maquina.titulo}`}
              height={300}
              width={1000}
              sizes="(max-width: 767px) 100vw, 33vw"
            />
          )}
        </div>
        <h3 className="text-center text-h3 font-bold text-primary">
          {maquina.titulo}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-body text-ink-muted">
          {maquina.descripcion}
        </p>
        <div className="mt-4">
          <Link className={botonSecundario} href={"/maquinaria"}>
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
            {" Ver más"}
          </Link>
        </div>
      </div>
    </article>
  );
}
