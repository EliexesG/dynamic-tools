import './tarjetaContacto.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, 
         faEnvelope } 
from "@fortawesome/free-solid-svg-icons";

export default function TarjetaContacto({titulo, especialidad, contactos, className}) {
    
    return (
        <article className={className}>
            <div className="card p-3 shadow tarjetaContacto">
                <div className="card-header bg-primary bg-gradient">
                    <h2 className="card-title text-white fw-bold text-center fs-4">{titulo}</h2>
                    {especialidad !== "N/A" && (
                        <h3 className='card-title text-white fw-bold text-center fs-5'>{especialidad}</h3>
                    )}
                </div>
                <div className="card-body">
                    {contactos.map((contacto, index) => (
                        <p className="card-text" key={index}>
                            <a className='text-decoration-none text-black card-text' href={contacto.tipo.includes("Cel") ? `tel:+506${contacto.detalle.replace(' ', '')}` : `mailto:${contacto.detalle}`}> 
                                <FontAwesomeIcon icon={ contacto.tipo.includes("Cel") ? faPhone : faEnvelope} /> {' '}
                                {`${contacto.tipo}: ${contacto.detalle}`}
                            </a>
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );

}