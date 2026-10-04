import TituloPagina from "./components/tituloPagina";
import Imagen from "./components/Imagen";

import { nosotrosInfo } from "@/lib/data";
import { serviciosInfo } from "@/lib/data";
import { maquinariaInfo } from "@/lib/data";
import { contactosInfo } from "@/lib/data";

import TarjetaMaquinariaInicio from "./maquinaria/components/tarjetaMaquinariaInicio";

import TarjetaServicioInicio from "./servicios/components/tarjetaServicioInicio";
import InformacionPlana from "./nosotros/components/informacionPlana";
import Link from "next/link";

import { SquareArrowOutUpRight } from "lucide-react";

const botonSecundario =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 font-medium text-white transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const metadata = {
  title: "A&M Dynamic Tools S.A.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <div className="mb-6 flex w-full justify-center border-b border-primary pb-2">
        <Imagen
          alt={"Logo Completo"}
          src={"/images/logos/full_size_logo.jpeg"}
          height={80}
          width={180}
        />
      </div>
      <TituloPagina
        url={"/images/inicio/inicio_page.jpg"}
        titulo={"A&M Dynamic Tools S.A."}
        texto={"Taller de Ingeniería Mecánica en Precisión"}
      />
      <InformacionPlana
        id="quehacemos"
        titulo={nosotrosInfo.informacionQueHacemos.titulo}
        descripcion={nosotrosInfo.informacionQueHacemos.descripcion}
      />
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
      <div className="mb-14 text-center">
        <Link className={botonSecundario} href={"/nosotros"}>
          <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
          {" Ver más"}
        </Link>
      </div>
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="servicios"
        titulo={serviciosInfo.titulo}
        descripcion={serviciosInfo.descripcionInicio}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {serviciosInfo.servicios.slice(0, 3).map((servicio, index) => (
          <TarjetaServicioInicio
            key={index}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
          />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="maquinaria"
        titulo={maquinariaInfo.titulo}
        descripcion={maquinariaInfo.descripcionInicio}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {maquinariaInfo.maquinas.slice(0, 3).map((maquina, index) => (
          <TarjetaMaquinariaInicio
            key={index}
            maquina={maquina}
            idNumero={index}
          />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="contactos"
        titulo={contactosInfo.titulo}
        descripcion={contactosInfo.descripcionInicio}
      />
      <div className="flex justify-center">
        <Link className={botonSecundario} href={"/contactanos"}>
          <SquareArrowOutUpRight
            aria-hidden="true"
            className="size-5"
          />{" "}
          Contáctanos
        </Link>
      </div>
    </>
  );
}
