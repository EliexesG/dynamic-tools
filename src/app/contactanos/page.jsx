import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";
import TituloPagina from "../components/tituloPagina";

import { contactosInfo } from "@/lib/data";

export const metadata = {
  title: "Contáctanos",
  description:
    "Pagina referente a informacion acerca de nuestros contactos como empresa A&M Dynamic Tools S.A.",
  alternates: {
    canonical: "/contactanos",
  },
};

export default function Contacto() {
  return (
    <>
      <TituloPagina
        url={contactosInfo.urlImagenPresentacion}
        titulo={contactosInfo.titulo}
        texto={contactosInfo.descripcion}
      />
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {contactosInfo.contactos.map((contacto, index) => (
          <TarjetaContacto
            key={index}
            titulo={contacto.titulo}
            contactos={contacto.contactos}
            especialidad={contacto.especialidad}
          />
        ))}
      </section>
      <FormularioContacto />
    </>
  );
}
