import TituloPagina from "./components/tituloPagina";

import { nosotrosInfo } from "@/lib/data";
import { serviciosInfo } from "@/lib/data";
import { maquinariaInfo } from "@/lib/data";
import { contactosInfo } from "@/lib/data";

import TarjetaMaquinariaInicio from "./maquinaria/components/tarjetaMaquinariaInicio";

import TarjetaServicioInicio from "./servicios/components/tarjetaServicioInicio";
import InformacionPlana from "./components/informacionPlana";
import Link from "next/link";

import { Button } from "./components/ui/button";
import { LucideEye, MailIcon } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Titulo de la pagina */}
      <TituloPagina
        url={"/images/inicio/inicio_page.jpg"}
        titulo={"A&M Dynamic Tools S.A."}
        texto={"Taller de Ingeniería Mecánica en Precisión"}
      />

      {/* que hacemos */}
      <InformacionPlana
        id="quehacemos"
        titulo={nosotrosInfo.informacionQueHacemos.titulo}
        descripcion={nosotrosInfo.informacionQueHacemos.descripcion}
      />

      {/* quienes somos */}
      <InformacionPlana
        id="quienesSomos"
        titulo={nosotrosInfo.informacionPrincipal.titulo.replace(
          " (Lo que nos Hace Únicos)",
          ""
        )}
        descripcion={nosotrosInfo.informacionPrincipal.descripcion
          .split("|")
          .slice(0, 3)
          .join("|")}
      />
      <Link href={"/nosotros"} className="ms-2">
        <Button className="text-white" variant="secondary">
          <LucideEye></LucideEye>
          Ver Más
        </Button>
      </Link>

      <hr className="mb-4 mt-4"></hr>

      {/* Los servicios que se ofrecen */}
      <InformacionPlana
        id="servicios"
        titulo={serviciosInfo.titulo}
        descripcion={serviciosInfo.descripcionInicio}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {serviciosInfo.servicios.slice(0, 3).map((servicio, index) => (
          <TarjetaServicioInicio
            className="mb-4 col-md-4"
            key={index}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}
      </div>

      <hr className="mb-4 mt-4"></hr>

      {/* Maquinaria */}
      <InformacionPlana
        id="maquinaria"
        titulo={maquinariaInfo.titulo}
        descripcion={maquinariaInfo.descripcionInicio}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {maquinariaInfo.maquinas.slice(0, 3).map((maquina, index) => (
          <TarjetaMaquinariaInicio
            className="mb-4 col-md-4"
            key={index}
            maquina={maquina}
          />
        ))}
      </div>

      <hr className="mb-4 mt-4"></hr>

      {/* Contactenos */}
      <InformacionPlana
        id="contactenos"
        titulo={contactosInfo.titulo}
        descripcion={contactosInfo.descripcionInicio}
      />
      <div className="flex flex-row justify-center w-full mb-4">
        <Link
          className="btn btn-secondary text-white"
          href={"/contactanos"}
        >
          {/* <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> */}
          <Button variant="secondary" className="text-white text-lg">
            <MailIcon></MailIcon>
          </Button>
        </Link>
      </div>
    </main>
  );
}
