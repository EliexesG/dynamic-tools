import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";
import TituloPagina from "../components/tituloPagina";

import { contactosInfo } from "@/lib/data";

export const metadata = {
    title: 'Contactanos',
    description: "Pagina referente a informacion acerca de nuestros contactos como empresa A&M Dynamic Tools S.A.",
    alternates: {
        canonical: "/contactanos"
    }
}

export default function Contacto () {

    return (
        <>
            <TituloPagina url={contactosInfo.urlImagenPresentacion} titulo={contactosInfo.titulo} texto={contactosInfo.descripcion} />
            <section className="row mb-4">
                {contactosInfo.contactos.map((contacto, index) => (
                    <TarjetaContacto className="col-md-4 mb-4" key={index} titulo={contacto.titulo} contactos={contacto.contactos} especialidad={contacto.especialidad}/>
                ))}
            </section>
            <FormularioContacto />
        </>
    );
}