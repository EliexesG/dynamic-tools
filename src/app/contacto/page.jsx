import TarjetaContacto from "./components/tarjetaContacto";
import FormularioContacto from "./components/formularioContacto";

import Image from "next/image";
import Imagen from '../images/contactanos_page.png';

import './page.css';

export const contactos = [
    {titulo: "A&M Dynamic Tools S.A.", contactos: [{tipo:"Email", detalle: "gympro001mensajes@gmail.com"}]},
    {titulo: "Ing. Mauricio Alfaro Martínez", contactos: [{tipo: "Cel", detalle: "8923 1003"}]},
    {titulo: "Jose Enrique Alfato Martínez", contactos: [{tipo: "Cel", detalle: "8989 3653"}, {tipo: "Email", detalle: "eliasgabriel6100@gmail.com" }]},
]

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