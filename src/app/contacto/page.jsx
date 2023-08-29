import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";
import { contactos } from "@/lib/data";

import Image from "next/image";
import Imagen from '@/images/contactanos_page.png';

import './page.css';

export default function Contacto () {

    return (
        <>
            <div id="contenedorImagenTexto" className="md-4">
                <Image id="imagenContactanos" src={Imagen} alt="contactanos page" height={3000} width={3000} className="rounded" />
                <h1 id="tituloContactenos" className="text-center">Contactos</h1>
                <p id="textoContactenos" className="text-center">En este apartado podrás encontrar todos nuestros contactos</p>
            </div>
            <hr className="mb-4 mt-4" />
            <div className="row">
                {contactos.map((contacto, index) => (
                    <TarjetaContacto className="col-md-4 mb-4" key={index} titulo={contacto.titulo} contactos={contacto.contactos}/>
                ))}
            </div>
            <hr className="mb-4 mt-4" />
            <FormularioContacto />
        </>
    );
}