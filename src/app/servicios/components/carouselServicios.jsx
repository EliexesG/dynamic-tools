'use client'

import { useState, useEffect } from 'react';
import './carouselServicios.css'

import Imagen from '@/app/components/Imagen';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const Indicador = ({imagen}) => {
        
    return (
        <>
            {imagen.id === 1 && (
                <button key={imagen.id} type="button" data-bs-target="#imagenesServicios" data-bs-slide-to={imagen.id-1} className="active" aria-current="true" aria-label={`Slide ${imagen.id}`}></button> 
            )}
            {imagen.id !== 1 && (
                <button key={imagen.id} type="button" data-bs-target="#imagenesServicios" data-bs-slide-to={imagen.id-1} aria-label={`Slide ${imagen.id}`}></button> 
            )}
        </>
    );

}

export default function CarouselServicios ({galeria}) {


    const [pantallaCompleta, setPantallaCompleta] = useState(false);

    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            
            if(pantallaCompleta === true) {
                handlePantallaCompleta(event);
            }

          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        // 👇️ clean up event listener
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
        
    });

    const handlePantallaCompleta = (e) => {
        setPantallaCompleta(!pantallaCompleta);

        if(pantallaCompleta) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
     }

    return (
        <article>
            <div id="imagenesServicios" className={`carousel slide bg-gradient bg-dark ${pantallaCompleta ? "mostrarPantallaCompleta" : "rounded-4"}`} data-bs-ride="carousel">
                <div className="carousel-indicators bg-black rounded p-1">
                    {galeria.map((imagen) => (
                        <Indicador key={imagen.id} imagen={imagen} />
                    ))}
                </div>
                <div className="carousel-inner h-100 w-100">
                    {galeria.map(imagen => (
                        <div key={imagen.id} className={`carousel-item ${imagen.id === 1 ? 'active' : ''}`}>
                           <Imagen src={imagen.url} height={1000} width={1000} alt={`imagen ${imagen.id}`} className="d-block rounded-4 mt-3" />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#imagenesServicios" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#imagenesServicios" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <button className='border border-0 bg-transparent' id='iconExpand' onClick={handlePantallaCompleta}>
                    <FontAwesomeIcon icon={faExpand} className='fs-2' />
                </button>
            </div>
        </article>
    );
}