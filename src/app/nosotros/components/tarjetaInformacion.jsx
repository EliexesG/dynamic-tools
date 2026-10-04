import { HeartHandshake } from "lucide-react";

export default function TarjetaInformacion({ titulo, descripcion, className }) {
  return (
    <article className={className}>
      <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-sm transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        <h3 className="flex items-center justify-center gap-2 text-center text-h3 font-bold text-primary">
          <HeartHandshake aria-hidden="true" className="size-6" />
          {titulo}
        </h3>
        <p className="mt-3 flex-1 text-body text-ink-muted">{descripcion}</p>
      </div>
    </article>
  );
}
