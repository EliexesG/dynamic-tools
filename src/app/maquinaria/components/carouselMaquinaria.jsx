import Carrusel from "@/app/components/carrusel";

export default function CarouselMaquinaria({ galeria, id }) {
  return (
    <article id={id}>
      <Carrusel
        items={galeria}
        ariaLabel="Galería de imágenes de la máquina"
        sizes="(max-width: 767px) 100vw, 33vw"
      />
    </article>
  );
}
