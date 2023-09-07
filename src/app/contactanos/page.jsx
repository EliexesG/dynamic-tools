import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";
import TituloPagina from "../components/TituloPagina";

import { contactosInfo } from "@/lib/data";

export const metadata = {
    title: 'Contactanos'
}

export default function Contacto () {

    return (
        <>
            <TituloPagina url={contactosInfo.urlImagenPresentacion} titulo={'Contactanos'} texto={'En este apartado podrás encontrar todos nuestros contactos'} />
            <section className="row mb-4">
                {contactosInfo.contactos.map((contacto, index) => (
                    <TarjetaContacto className="col-md-4 mb-4" key={index} titulo={contacto.titulo} contactos={contacto.contactos} especialidad={contacto.especialidad}/>
                ))}
            </section>
            <FormularioContacto />
        </>
    );
}