'use client'

import './tarjetaServicio.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function TarjetaServicio ({titulo, descripcion}) {

    const [mostrarTexto, setMostrarTexto] = useState(false);
    const [tuercaGira, setTuercaGira] = useState(false);
    const [flechaHaciaArriba, setFlechaHaciaArriba] = useState(false);

    const handleMostrarTexto = (e) => {
        setMostrarTexto(!mostrarTexto);
        setTuercaGira(!tuercaGira);
        setFlechaHaciaArriba(!flechaHaciaArriba);
    }

    return (
        <article className="card shadow mb-4 p-4 bg-light">
            <div className="row">
                <div className="card-header text-center col-md-4 d-flex align-items-center justify-content-center">
                    <h4 className="card-title">{titulo}</h4>
                </div>
                <div className="card-body col-md-6 d-flex align-items-center justify-content-center">
                    <p className={`card-text ${!mostrarTexto ? 'text-ocultado' : 'text-completo'}`}>{descripcion}</p>
                </div>
                <div className='col-md-2 d-flex align-items-center justify-content-center'>
                    <FontAwesomeIcon icon={faArrowDown} className={`fs-4 ms-1 ${flechaHaciaArriba ? 'arrow_up' : 'arrow_down'}`} /> 
                    <button 
                        className={`border-0 bg-light bg-opacity-10 ${tuercaGira ? 'icon_spin' : 'icon_start_position'}`}
                        onClick={handleMostrarTexto}
                    >
                        <FontAwesomeIcon icon={faGear} className="fs-1 icon" />
                    </button>
                </div>
            </div>
        </article>
    );

}