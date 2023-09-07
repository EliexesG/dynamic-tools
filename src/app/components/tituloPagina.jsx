import './tituloPagina.css';

import Imagen from "./Imagen";

export default function TituloPagina ({url, titulo, texto}) {
    return (
        <>
            <div id="contenedorImagenTextoTitulo" className="mb-4">
                <Imagen id="imagenTitulo" src={url} alt={titulo} height={3000} width={3000} className="rounded bg-dark" />
                <h1 id="tituloPaginaTitulo" className="text-center">{titulo}</h1>
                <p id="textoPaginaTitulo" className="text-center">{texto}</p>
            </div>
            <hr className="mb-4" />
        </>
    );
}