import './tarjetaContacto.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, 
         faEnvelope } 
from "@fortawesome/free-solid-svg-icons";

export default function TarjetaContacto({titulo, contactos, className}) {
    
    return (
        <div className={className}>
            <div className="card p-3 shadow tarjetaContacto">
                <div className="card-header">
                    <h3 className="card-title">{titulo}</h3>
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
        </div>
    );

}