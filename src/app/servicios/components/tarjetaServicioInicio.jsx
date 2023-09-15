import './tarjetaServicioInicio.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';

export default function TarjetaServicioInicio({titulo, descripcion, className}) {
    
    return (
        <article className={className}>
            <div className="card p-3 shadow tarjetaServicio rounded-4">
                <div className="card-header bg-gradient">
                    <h3 className="card-title text-primary fw-bold text-center">
                        <FontAwesomeIcon icon={faHandshakeAngle} />
                        {` ${titulo}`}
                    </h3>
                </div>
                <div className="card-body">
                    <p className="card-text">
                    {descripcion}
                    </p>
                </div>
                <div className='card-footer'>
                    <Link className="btn btn-secondary text-white w-100" href={"/servicios"} ><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Ver más</Link>
                </div>
            </div>
        </article>
    );

}