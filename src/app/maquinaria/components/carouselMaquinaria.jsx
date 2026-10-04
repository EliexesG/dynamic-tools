import "./carouselMaquinaria.css";
import Imagen from "@/app/components/Imagen";

const Indicador = ({ imagen, targetId }) => {
  const activo = imagen.id === 1;
  return (
    <button
      type="button"
      data-bs-target={`#${targetId}`}
      data-bs-slide-to={imagen.id - 1}
      className={activo ? "active" : undefined}
      aria-current={activo ? "true" : undefined}
      aria-label={`Slide ${imagen.id}`}
    ></button>
  );
};

export default function CarouselMaquinaria({ galeria, id }) {
  return (
    <article>
      <div
        id={id}
        className="carousel slide bg-gradient bg-dark carouselMaquinaria rounded-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators bg-black rounded p-1">
          {galeria.map((imagen) => (
            <Indicador key={imagen.id} imagen={imagen} targetId={id} />
          ))}
        </div>
        <div className="carousel-inner h-100 w-100">
          {galeria.map((imagen) => (
            <div
              key={imagen.id}
              className={`carousel-item ${imagen.id === 1 ? "active" : ""}`}
            >
              <Imagen
                src={imagen.url}
                height={1000}
                width={1000}
                alt={`imagen ${imagen.id}`}
                sizes="(max-width: 767.98px) 100vw, 33vw"
                className="d-block rounded-4 mt-3"
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </article>
  );
}
