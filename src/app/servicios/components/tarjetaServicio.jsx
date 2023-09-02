'use client'

import './tarjetaServicio.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function TarjetaServicio ({titulo, descripcion}) {

    const [mostrarTexto, setMostrarTexto] = useState(false);

    const handleMostrarTexto = (e) => {
        //var element = e.currentTarget.parentNode.parentNode.querySelector(".card-body .card-text");
        //element.classList.replace('text-ocultado', 'text-completo')
        setMostrarTexto(!mostrarTexto);
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
                    <button 
                        className='border-0 bg-light'
                        onClick={handleMostrarTexto}
                    >
                        <FontAwesomeIcon icon={faGear} className="fs-1 icon" />
                    </button>
                    <FontAwesomeIcon icon={faArrowLeft} className="fs-4 ms-1 arrow" /> 
                </div>
            </div>
        </article>
    );

}