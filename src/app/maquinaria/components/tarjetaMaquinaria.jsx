'use client'

import './tarjetaMaquinaria.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

import Imagen from '@/app/components/Imagen';
import { useState, useEffect } from 'react';

export default function TarjetaMaquina ({titulo, descripcion, imagenes}) {

    const [mostrarImagenesCompleto, setMostrarImagenesCompleto] = useState(false);

    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            
            if(mostrarImagenesCompleto === true) {
                handleMostrarImagenesCompleto(event);
            }

          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        // 👇️ clean up event listener
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
        
    });

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
        <article className="row p-3 mb-4 rounded border border-1 border-primary border-start">
            <div className={`col-md-6 ${mostrarImagenesCompleto ? "mostrarImagenesCompleto" : ""}`}>
                <div className='pt-2'>
                    <button className='btn btn-secondary text-white' onClick={handleMostrarImagenesCompleto}>
                        <FontAwesomeIcon icon={faExpand}/>
                        <span className="ms-2 fw-bold">{mostrarImagenesCompleto ? "Minimizar" : "Maximizar"}</span>
                    </button>
                </div>
                <div className='border-top border-primary pt-3 pb-3 row align-items-center justify-content-center contenedorImagenes mt-3'>
                    {imagenes.map(imagen => (
                        <Imagen key={imagen.id} className={"col-sm-6 imagenMaquina rounded p-0 m-2 shadow"} alt={`imagen ${titulo} ${imagen.id}`} src={imagen.url} width={1600} height={1201} />
                    ))}
                </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center flex-column mt-4" id="contenedorCartaTexto">
                <h4 className="fw-bold text-center rounded p-2 bg-primary text-white fw-bold">{titulo}</h4>
                <p>{descripcion}</p>
            </div>
        </article>
    );
}