import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";
import { contactos } from "@/lib/data";

import Image from "next/image";

import './page.css';

export const metadata = {
    title: 'Contactanos'
}

export default function Contacto () {

    return (
        <>
            <div id="contenedorImagenTexto" className="mb-4">
                <Image id="imagenContactanos" src={'/images/contactanos/contactanos_page.png'} alt="contactanos page" height={3000} width={3000} className="rounded" />
                <h1 id="tituloContactenos" className="text-center">Contactanos</h1>
                <p id="textoContactenos" className="text-center">En este apartado podrás encontrar todos nuestros contactos</p>
            </div>
            <hr className="mb-4" />
            <section className="row mb-4">
                {contactos.map((contacto, index) => (
                    <TarjetaContacto className="col-md-4 mb-4" key={index} titulo={contacto.titulo} contactos={contacto.contactos}/>
                ))}
            </section>
            <FormularioContacto />
        </>
    );
}