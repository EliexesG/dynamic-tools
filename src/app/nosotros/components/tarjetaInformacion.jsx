import "./tarjetaInformacion.css";

export default function TarjetaInformacion({ titulo, descripcion, className }) {
  return (
    <article className={className}>
      <div className="card p-3 shadow tarjetaInformacion rounded-4">
        <div className="card-header bg-gradient">
          <h3 className="card-title text-primary fw-bold text-center">
            {/* <FontAwesomeIcon icon={faHandHoldingHeart} /> */}
            {` ${titulo}`}
          </h3>
        </div>
        <div className="card-body">
          <p className="card-text">{descripcion}</p>
        </div>
      </div>
    </article>
  );
}
