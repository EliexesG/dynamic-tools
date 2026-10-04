import Carrusel from "@/app/components/carrusel";

export default function CarouselServicios({ galeria }) {
  return (
    <article>
      <Carrusel
        items={galeria}
        ariaLabel="Galería de imágenes de servicios"
        sizes="(max-width: 767px) 100vw, 60vw"
        permitirPantallaCompleta
      />
    </article>
  );
}
