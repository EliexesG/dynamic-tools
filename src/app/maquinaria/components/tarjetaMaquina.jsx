'use client'

import './tarjetaMaquinaria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Imagen from '@/app/components/Imagen';
import { useState } from 'react';

export default function TarjetaMaquina ({titulo, descripcion, imagenes}) {

    const [mostrarImagenesCompleto, setMostrarImagenesCompleto] = useState(false);

    const handleMostrarImagenesCompleto = (e) => {
        setMostrarImagenesCompleto(!mostrarImagenesCompleto);

        if(mostrarImagenesCompleto) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
    }

    return (
        <article className="row p-3 mb-4 rounded border border-1 border-primary">
            <div className={`col-md-6 row align-items-center justify-content-center mt-4 ${mostrarImagenesCompleto ? "mostrarImagenesCompleto" : ""}`}>
                <div className='ruedaContenedor'>
                    <button className='border border-0 bg-transparent' onClick={handleMostrarImagenesCompleto}>
                        <FontAwesomeIcon className='rueda fs-2 text-secondary' icon={faImage}/>
                    </button>
                </div>
                {imagenes.map(imagen => (
                    <Imagen key={imagen.id} className={"col-sm-6 imagenMaquina rounded p-0 m-1 shadow"} alt={`imagen ${titulo} ${imagen.id}`} src={imagen.url} width={1600} height={1201} />
                ))}
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center flex-column mt-4" id="contenedorCartaTexto">
                <h4 className="fw-bold text-center">{titulo}</h4>
                <p>{descripcion}</p>
            </div>
        </article>
    );
}