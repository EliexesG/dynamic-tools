import './footer.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, 
         faHandshakeAngle, 
         faScrewdriverWrench, 
         faUsers, 
         faEnvelopeOpen } 
from "@fortawesome/free-solid-svg-icons";

export default function Footer () {
    return (
        <div className="footer mt-auto w-100">
            <footer className="text-center text-white bg-dark">
                <div className="container d-block">
                    <section className="mt-5">
                        <div className="row text-center d-flex justify-content-center pt-5">
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/">
                                    <FontAwesomeIcon icon={faHouse} /> Inicio</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/servicios">
                                    <FontAwesomeIcon icon={faHandshakeAngle} /> Servicios</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/maquinaria">
                                    <FontAwesomeIcon icon={faScrewdriverWrench} /> Maquinaria</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/nosotros">
                                    <FontAwesomeIcon icon={faUsers} /> Nosotros</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a className="text-decoration-none text-white-50 footer-link" aria-current="page" href="/contacto">
                                    <FontAwesomeIcon icon={faEnvelopeOpen} /> Contacto</a>
                                </h6>
                            </div>
                        </div>
                    </section>
                    <hr className="my-2" />
                    <section className="mb-2 mt-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sunt, ex aliquid velit rem architecto ullam cupiditate expedita, quis sapiente repellendus officiis itaque, fugiat beatae eum praesentium iure debitis.
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