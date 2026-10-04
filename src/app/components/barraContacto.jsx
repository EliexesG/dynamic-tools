import { Phone, MessageCircleMore } from "lucide-react";

import { contactoDirecto } from "@/lib/data";

const botonBase =
  "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

export default function BarraContacto() {
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-secondary bg-primary px-3 py-2 pb-[calc(0.5rem_+_env(safe-area-inset-bottom,0px))] lg:hidden"
        aria-label="Acciones de contacto rápido"
      >
        <a
          className={`${botonBase} bg-secondary text-white hover:bg-secondary/90`}
          href={contactoDirecto.telefonoHref}
          aria-label={`Llamar al ${contactoDirecto.telefono}`}
        >
          <Phone aria-hidden="true" className="size-5" /> Llamar
        </a>
        <a
          className={`${botonBase} border border-white/40 text-white hover:bg-white/10`}
          href={contactoDirecto.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
        >
          <MessageCircleMore aria-hidden="true" className="size-5" /> WhatsApp
        </a>
      </div>
      <div
        className="h-[calc(56px_+_env(safe-area-inset-bottom,0px))] lg:hidden"
        aria-hidden="true"
      />
    </>
  );
}
