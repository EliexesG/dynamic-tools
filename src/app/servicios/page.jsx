import './page.css';

import Imagen from '../components/Imagen';

import { serviciosInfo } from '@/lib/data';
import TarjetaServicio from './components/tarjetaServicio';
import CarouselServicios from './components/carouselServicios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Servicios'
}

export default function Servicios () {

    return (
        <>
            <div id="contenedorImagenTexto" className="mb-4">
                <Imagen id="imagenServicios" src={serviciosInfo.urlImagenPresentacion} alt="servicios page" height={3000} width={3000} className="rounded bg-dark" />
                <h1 id="tituloServicios" className="text-center">Servicios</h1>
                <p id="textoServicios" className="text-center">En este apartado podrás encontrar todos los servicios que ofrecemos</p>
            </div>
            <hr className="mb-4" />
            <div className='text-center mb-4'><a href='#imagenes' className='text-decoration-none btn-secondary btn text-white p-3'><FontAwesomeIcon icon={faImage}/> Ver Galería</a></div>
            <section className='mb-4'>
                {serviciosInfo.servicios.map((servicio, index) => (
                    <TarjetaServicio 
                        key={index} 
                        titulo={servicio.titulo} 
                        descripcion={servicio.descripcion} 
                    />
                ))}
            </section>
            <hr className="mb-4 mt4" />
            <section id='imagenes'>
                <h1 className="text-center fw-bold">Galería</h1>
                <p className="text-center fw-bold mb-4">Ejemplos de trabajos realizados en el taller</p>
                <CarouselServicios galeria={serviciosInfo.galeria} />
            </section>
        </>
    );
}