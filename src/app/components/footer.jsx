import './footer.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, 
         faHandshakeAngle, 
         faScrewdriverWrench, 
         faUsers, 
         faComment } 
from "@fortawesome/free-solid-svg-icons";

import Link from 'next/link';

export default function Footer () {
    return (
        <div className="footer mt-auto w-100">
            <footer className="text-center text-white bg-primary bg-gradient">
                <div className="container d-block">
                    <section className="mt-5">
                        <div className="row text-center d-flex justify-content-center pt-5">
                            <div className="col-md-2">
                                <p className="text-uppercase font-weight-bold">
                                    <Link className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/">
                                    <FontAwesomeIcon icon={faHouse} /> Inicio</Link>
                                </p>
                            </div>
                            <div className="col-md-2">
                                <p className="text-uppercase font-weight-bold">
                                    <Link className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/servicios">
                                    <FontAwesomeIcon icon={faHandshakeAngle} /> Servicios</Link>
                                </p>
                            </div>
                            <div className="col-md-2">
                                <p className="text-uppercase font-weight-bold">
                                    <Link className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/maquinaria">
                                    <FontAwesomeIcon icon={faScrewdriverWrench} /> Maquinaria</Link>
                                </p>
                            </div>
                            <div className="col-md-2">
                                <p className="text-uppercase font-weight-bold">
                                    <Link className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/nosotros">
                                    <FontAwesomeIcon icon={faUsers} /> Nosotros</Link>
                                </p>
                            </div>
                            <div className="col-md-2">
                                <p className="text-uppercase font-weight-bold">
                                    <Link className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/contactanos">
                                    <FontAwesomeIcon icon={faComment} /> Contactanos</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                    <hr className="my-2" />
                    <section className="mb-2 mt-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <p>
                                    Somos una empresa encargada de un taller que da soporte de ingeniería a clientes en los campos de diseño mecánico, metalmecánica, mecanizado e integración de sistemas hidráulicos, naumáticos y control eléctrico, representando nuestra marca con valores de confianza, responsabilidad e integridad
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="text-center p-3">
                    © 2023 Copyright:
                    <span className="text-white"> A&M Dynamic Tools S.A.</span>
                </div>
            </footer>
        </div>
    );
}