import "./barraContacto.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCommentDots } from "@fortawesome/free-solid-svg-icons";

import { contactoDirecto } from "@/lib/data";

export default function BarraContacto() {
  return (
    <>
      <div
        className="barraContacto d-lg-none fixed-bottom bg-primary bg-gradient border-top border-secondary"
        aria-label="Acciones de contacto rápido"
      >
        <a
          className="btn btn-secondary text-white flex-fill"
          href={contactoDirecto.telefonoHref}
          aria-label={`Llamar al ${contactoDirecto.telefono}`}
        >
          <FontAwesomeIcon icon={faPhone} aria-hidden="true" /> Llamar
        </a>
        <a
          className="btn btn-outline-light flex-fill"
          href={contactoDirecto.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
        >
          <FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /> WhatsApp
        </a>
      </div>
      <div className="barraContacto-espaciador d-lg-none" aria-hidden="true" />
    </>
  );
}
