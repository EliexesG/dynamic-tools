import { serviciosInfo, galeriaInfo } from "@/lib/data";
import TarjetaServicio from "./components/tarjetaServicio";
import CarouselServicios from "./components/carouselServicios";
import TituloPagina from "../components/tituloPagina";

import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const botonSecundario =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const metadata = {
  title: "Servicios",
  description:
    "Pagina referente a informacion acerca de nuestros servicios como empresa A&M Dynamic Tools S.A.",
  alternates: {
    canonical: "/servicios",
  },
};

export default function Servicios() {
  return (
    <>
      <TituloPagina
        url={serviciosInfo.urlImagenPresentacion}
        titulo={serviciosInfo.titulo}
        texto={serviciosInfo.descripcion}
      />
      <div className="mb-14 text-center">
        <Link href="/galeria" className={botonSecundario}>
          <ImageIcon aria-hidden="true" className="size-5" /> Ver Galería
        </Link>
      </div>
      <section className="mb-14">
        {serviciosInfo.servicios.map((servicio, index) => (
          <TarjetaServicio
            key={index}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}
      </section>
      <hr className="my-14 border-t border-border" />
      <section id="imagenes">
        <h2 className="text-center text-h2 font-bold text-ink">Galería</h2>
        <p className="mt-3 text-center font-semibold text-ink-muted">
          Ejemplos de trabajos realizados en el taller
        </p>
        <div className="mt-4 mb-6 text-center">
          <Link
            className="inline-flex items-center rounded-full bg-primary px-3 py-1 font-bold text-white no-underline transition-colors hover:bg-secondary"
            href="/galeria"
          >
            Ver más
          </Link>
        </div>
        <CarouselServicios galeria={galeriaInfo.imagenes.slice(0, 5)} />
      </section>
    </>
  );
}
