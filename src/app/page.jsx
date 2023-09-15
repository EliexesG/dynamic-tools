import TituloPagina from "./components/tituloPagina";
import Imagen from "./components/Imagen";

import { nosotrosInfo } from "@/lib/data";
import { serviciosInfo } from "@/lib/data";
import { maquinariaInfo } from "@/lib/data";

import TarjetaMaquinariaInicio from "./maquinaria/components/tarjetaMaquinariaInicio";

import TarjetaServicioInicio from "./servicios/components/tarjetaServicioInicio";
import InformacionPlana from "./nosotros/components/informacionPlana";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <TituloPagina url={"/images/inicio/inicio_page.jpg"} titulo={"A&M Dynamic Tools S.A."} texto={"Taller de Ingeniería Mecánica en Precisión"} />
      <div className="mb-4 d-flex justify-content-center w-100">
        <Imagen alt={"Logo Completo"} src={"/images/logos/full_size_logo.jpeg"} height={150} width={250} />
        <Link className="btn btn-secondary text-white ms-2 h-25" href={"/contactanos"} ><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Contactanos</Link>
      </div>
      <hr className='mb-4'></hr>
      <InformacionPlana id="quienesSomos" titulo={nosotrosInfo.informacionPrincipal.titulo.replace(' (Lo que nos Hace Únicos)', '')} descripcion={nosotrosInfo.informacionPrincipal.descripcion.split('|').slice(0, 3).join('|')} />
      <Link className="btn btn-secondary text-white mb-4" href={"/nosotros"} ><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Ver más</Link>
      <hr className='mb-4'></hr>
      <InformacionPlana id="servicios" titulo={serviciosInfo.titulo} descripcion={serviciosInfo.descripcionInicio}/>
      <div className="row">
        {serviciosInfo.servicios.slice(0, 3).map((servicio, index) => (
          <TarjetaServicioInicio className="mb-4 col-md-4" key={index} titulo={servicio.titulo} descripcion={servicio.descripcion} />
        ))}
      </div>
      <hr className='mb-4'></hr>
      <InformacionPlana id="maquinaria" titulo={maquinariaInfo.titulo} descripcion={maquinariaInfo.descripcionInicio}/>
      <div className="row">
        {maquinariaInfo.maquinas.slice(0, 3).map((maquina, index) => (
            <TarjetaMaquinariaInicio className="mb-4 col-md-4" key={index} maquina={maquina} idNumero={index} />
        ))}
      </div>
    </>
  )
}
