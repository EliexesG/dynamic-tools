'use client'

import './carouselServicios.css'

import Image from "next/image";

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

export default function CarouselServicios ({imagenes}) {


    return (
        <article>
            <div id="imagenesServicios" className="carousel slide rounded-4 bg-gradient bg-dark">
                <div className="carousel-indicators bg-black rounded p-1">
                    {imagenes.map((imagen) => (
                        <Indicador key={imagen.id} imagen={imagen} />
                    ))}
                </div>
                <div className="carousel-inner">
                    {imagenes.map(imagen => (
                        <div key={imagen.id} className={`carousel-item ${imagen.id === 1 ? 'active' : ''}`}>
                           <Image src={imagen.url} height={1000} width={1000} alt={`imagen ${imagen.id}`} className="d-block rounded mt-3" />
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
            </div>
        </article>
    );
}