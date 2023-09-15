import './tarjetaMaquinariaInicio.css';

import CarouselMaquinaria from './CarouselMaquinaria';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function TarjetaMaquinariaInicio({
 maquina,
 className,
 idNumero
}) {
  return (
    <article className={className + " tarjetaMaquinaria"}>
      <div className="card p-3 shadow tarjetaInformacion rounded-4">
        <div className="card-header bg-gradient">
          <div><CarouselMaquinaria id={`carouselMaquinaria${idNumero}`} galeria={maquina.imagenes} /></div>
          <h3 className="card-title text-primary fw-bold text-center">
            {` ${maquina.titulo}`}
          </h3>
        </div>
        <div className="card-body">
          <p className="card-text">{maquina.descripcion}</p>
        </div>
        <div className='card-footer'>
          <Link className="btn btn-secondary text-white w-100" href={"/maquinaria"} ><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Ver más</Link>
        </div>
      </div>
    </article>
  );
}
