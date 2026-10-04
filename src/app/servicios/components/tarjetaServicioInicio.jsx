import { HeartHandshake, SquareArrowOutUpRight } from "lucide-react";

import Link from "next/link";

const botonSecundario =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function TarjetaServicioInicio({ titulo, descripcion, className }) {
  return (
    <article className={className}>
      <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-sm transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        <h3 className="flex items-center justify-center gap-2 text-center text-h3 font-bold text-primary">
          <HeartHandshake aria-hidden="true" className="size-6" />
          {titulo}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-body text-ink-muted">
          {descripcion}
        </p>
        <div className="mt-4">
          <Link className={botonSecundario} href={"/servicios"}>
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
            {" Ver más"}
          </Link>
        </div>
      </div>
    </article>
  );
}
