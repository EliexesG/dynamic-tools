import { serviciosInfo } from '@/lib/data';
import TarjetaServicio from './components/tarjetaServicio';
import CarouselServicios from './components/carouselServicios';
import TituloPagina from '../components/tituloPagina';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Servicios',
    description: "Pagina referente a informacion acerca de nuestros servicios como empresa A&M Dynamic Tools S.A.",
    alternates: {
        canonical: "/servicios"
    }
}

export default function Servicios () {

    return (
        <>
            <TituloPagina url={serviciosInfo.urlImagenPresentacion} titulo={serviciosInfo.titulo} texto={serviciosInfo.descripcion} />
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