import "./page.css";

import { serviciosInfo, galeriaInfo } from "@/lib/data";
import TarjetaServicio from "./components/tarjetaServicio";
import CarouselServicios from "./components/carouselServicios";
import TituloPagina from "../components/tituloPagina";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
      <div className="text-center mb-4">
        <Link
          href="/galeria"
          className="text-decoration-none btn-secondary btn text-white p-3"
        >
          <FontAwesomeIcon icon={faImage} /> Ver Galería
        </Link>
      </div>
      <section className="mb-4">
        {serviciosInfo.servicios.map((servicio, index) => (
          <TarjetaServicio
            key={index}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}
      </section>
      <hr className="mb-4 mt4" />
      <section id="imagenes">
        <h2 className="text-center fw-bold">Galería</h2>
        <p className="text-center fw-bold mb-4">
          Ejemplos de trabajos realizados en el taller {"("}
          <Link
            className="rounded-4 text-decoration-none bg-primary p-1 text-white fw-bold ps-2 pe-2"
            id="verMasGaleria"
            href="/galeria"
          >
            Ver más
          </Link>
          {")"}
        </p>
        <CarouselServicios galeria={galeriaInfo.imagenes.slice(0, 5)} />
      </section>
    </>
  );
}
