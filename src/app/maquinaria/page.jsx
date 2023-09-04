import './page.css';

import Imagen from '../components/Imagen';

export const metadata = {
    title: 'Maquinaria'
}

export default function Maquinaria () {

    return (
        <>
            <div id="contenedorImagenTexto" className="mb-4">
                <Imagen id="imagenMaquinaria" src={'/images/maquinaria/maquinaria_page.jpg'} alt="maquinaria page" height={3000} width={3000} className="rounded bg-dark" />
                <h1 id="tituloMaquinaria" className="text-center">Maquinaria</h1>
                <p id="textoMaquinaria" className="text-center">En este apartado podrás encontrar los equipos con los que contamos</p>
            </div>
            <hr className="mb-4" />
        </>
    );
}