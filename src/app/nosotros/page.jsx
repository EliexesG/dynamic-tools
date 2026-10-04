import { nosotrosInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";
import InformacionPlana from "./components/informacionPlana";
import TarjetaInformacion from "./components/tarjetaInformacion";

import { HeartHandshake, Users, Eye, Map, MapPin } from "lucide-react";

const botonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const botonSecundario = `${botonBase} bg-secondary hover:bg-primary`;
const botonPrimario = `${botonBase} bg-primary hover:bg-secondary`;

const enlaces = [
  { href: "#quienesSomos", icon: Users, label: "Quienes Somos", clase: botonSecundario },
  { href: "#valores", icon: HeartHandshake, label: "Valores", clase: botonPrimario },
  { href: "#vision", icon: Eye, label: "Visión", clase: botonSecundario },
  { href: "#mision", icon: Map, label: "Misión", clase: botonPrimario },
  { href: "#ubicacion", icon: MapPin, label: "Ubicación", clase: botonSecundario },
];

export const metadata = {
  title: "Nosotros",
  description:
    "Pagina referente a informacion acerca de nosotros como empresa A&M Dynamic Tools S.A.",
  alternates: {
    canonical: "/nosotros",
  },
};

export default function Nosotros() {
  return (
    <>
      <TituloPagina
        url={nosotrosInfo.urlImagenPresentacion}
        titulo={"Nosotros"}
        texto={
          "En este apartado podrás encontrar toda la información sobre nosotros"
        }
      />
      <div id="botones" className="mb-14 flex flex-wrap justify-center gap-2">
        {enlaces.map(({ href, icon: Icono, label, clase }) => (
          <a key={href} href={href} className={clase}>
            <Icono aria-hidden="true" className="size-5" /> {label}
          </a>
        ))}
      </div>
      <InformacionPlana
        id="quienesSomos"
        titulo={nosotrosInfo.informacionPrincipal.titulo}
        descripcion={nosotrosInfo.informacionPrincipal.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="valores"
        titulo={nosotrosInfo.informacionValores.titulo}
        descripcion={nosotrosInfo.informacionValores.descripcion}
      />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {nosotrosInfo.informacionValores.valores.map((valor, index) => (
          <TarjetaInformacion
            key={index}
            titulo={valor.titulo}
            descripcion={valor.descripcion}
          />
        ))}
      </section>
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="vision"
        titulo={nosotrosInfo.informacionVision.titulo}
        descripcion={nosotrosInfo.informacionVision.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      <InformacionPlana
        id="mision"
        titulo={nosotrosInfo.informacionMision.titulo}
        descripcion={nosotrosInfo.informacionMision.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InformacionPlana
          id="ubicacion"
          titulo={nosotrosInfo.informacionUbicacion.titulo}
          descripcion={nosotrosInfo.informacionUbicacion.descripcion}
        />
        <div
          title="mapa"
          className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-muted [&_iframe]:h-full [&_iframe]:min-h-[300px] [&_iframe]:w-full"
          dangerouslySetInnerHTML={{
            __html: nosotrosInfo.informacionUbicacion.html,
          }}
        />
      </section>
    </>
  );
}
