'use client'

import './tarjetaMaquinaria.css';

import Imagen from '@/app/components/Imagen';

export default function TarjetaMaquina ({titulo, descripcion, imagenes}) {
    return (
        <article className="row p-3 mb-4 rounded border border-1 border-primary">
            <div className="col-md-6 row align-items-center justify-content-center mb-4">
                {imagenes.map(imagen => (
                    <Imagen key={imagen.id} className={"col-md-6 imagenMaquina rounded"} alt={`imagen ${titulo} ${imagen.id}`} src={imagen.url} width={1600} height={1201} />
                ))}
            </div>
            <div className="col-md-5 d-flex align-items-center justify-content-center flex-column" id="contenedorCartaTexto">
                <h4 className="fw-bold text-center">{titulo}</h4>
                <p>{descripcion}</p>
            </div>
        </article>
    );
}