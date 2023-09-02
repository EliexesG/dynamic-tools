import './page.css';

import Imagen from '../components/Imagen';

import { servicios } from '@/lib/data';
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
                <Imagen id="imagenServicios" src={'/images/servicios/servicios_page.jpg'} alt="servicios page" height={3000} width={3000} className="rounded" />
                <h1 id="tituloServicios" className="text-center">Servicios</h1>
                <p id="textoServicios" className="text-center">En este apartado podrás encontrar todos los servicios que ofrecemos</p>
            </div>
            <hr className="mb-4" />
            <div className='text-start mb-4'><a href='#imagenes' className='text-decoration-none btn btn-dark'><FontAwesomeIcon icon={faImage}/> Ver Imagenes</a></div>
            <section className='mb-4'>
                {servicios.informacion.map((servicio, index) => (
                    <TarjetaServicio 
                        key={index} 
                        titulo={servicio.titulo} 
                        descripcion={servicio.descripcion} 
                    />
                ))}
            </section>
            <hr className="mb-4 mt4" />
            <section id='imagenes'>
                <h1 className="text-center fw-bold">Imagenes</h1>
                <p className="text-center fw-bold mb-4">Imagenes de ejemplo y procesos</p>
                <CarouselServicios imagenes={servicios.imagenes} />
            </section>
        </>
    );
}