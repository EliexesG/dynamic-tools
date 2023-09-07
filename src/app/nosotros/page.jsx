import { nosotrosInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";
import InformacionPlana from "./components/informacionPlana";
import TarjetaInformacion from "./components/tarjetaInformacion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart, faUsers, faEye, faMap, faMapPin } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
    title: 'Nosotros'
}

export default function Nosotros () {
    return (
        <>
            <TituloPagina url={nosotrosInfo.urlImagenPresentacion} titulo={'Nosotros'} texto={'En este apartado podrás encontrar toda la información sobre nosotros'} />
            <div id='botones' className='mb-4 text-center'>
                <a href='#quienesSomos' className='text-decoration-none btn-secondary btn text-white p-2 me-1 mb-1'><FontAwesomeIcon icon={faUsers}/> Quienes Somos</a>
                <a href='#valores' className='text-decoration-none btn-primary btn text-white p-2 me-1 mb-1'><FontAwesomeIcon icon={faHandHoldingHeart}/> Valores</a>
                <a href='#vision' className='text-decoration-none btn-secondary btn text-white p-2 me-1 mb-1'><FontAwesomeIcon icon={faEye}/> Visión</a>
                <a href='#mision' className='text-decoration-none btn-primary btn text-white p-2 me-1 mb-1'><FontAwesomeIcon icon={faMap}/> Misión</a>
                <a href='#ubicacion' className='text-decoration-none btn-secondary btn text-white p-2 me-1 mb-1'><FontAwesomeIcon icon={faMapPin}/> Ubicación</a>
            </div>
            <InformacionPlana id="quienesSomos" titulo={nosotrosInfo.informacionPrincipal.titulo} descripción={nosotrosInfo.informacionPrincipal.descripción} />
            <hr className='mb-4'></hr>
            <InformacionPlana id="valores" titulo={nosotrosInfo.informacionValores.titulo} descripción={nosotrosInfo.informacionValores.descripcion} />
            <section className="row">
                {nosotrosInfo.informacionValores.valores.map((valor, index) => (
                    <TarjetaInformacion key={index} className={'col-md-4 mb-4'} titulo={valor.titulo} descripcion={valor.descripcion} />
                ))}
            </section>
            <hr className='mb-4'></hr>
            <InformacionPlana id="vision" titulo={nosotrosInfo.informacionVision.titulo} descripción={nosotrosInfo.informacionVision.descripcion} />
            <hr className='mb-4'></hr>
            <InformacionPlana id="mision" titulo={nosotrosInfo.informacionMision.titulo} descripción={nosotrosInfo.informacionMision.descripcion} />
            <hr className='mb-4'></hr>
            <section className="row">
                <InformacionPlana id="ubicacion" className={"col-md-6"} titulo={nosotrosInfo.informacionUbicacion.titulo} descripción={nosotrosInfo.informacionUbicacion.descripcion} />
                <article className="col-md-6 rounded d-flex align-items-center justify-content-center" dangerouslySetInnerHTML={{__html: nosotrosInfo.informacionUbicacion.html}} />
            </section>
        </>
    );
}