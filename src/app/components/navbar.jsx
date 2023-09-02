import './navbar.css';

import Imagen from './Imagen';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, 
         faHandshakeAngle, 
         faScrewdriverWrench, 
         faUsers, 
         faComment } 
from "@fortawesome/free-solid-svg-icons";

export default function Navbar () {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100 top-0 z-3">
        <div className="container-fluid">
        <a className="navbar-brand align-items-center" href="/">
          <Imagen src={'/images/logos/small_size_logo.png'} alt="brand-logo" width={55} height={49} className="me-2 rounded"/>
          <span>A&M Dynamic Tools S.A.</span>
        </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                <FontAwesomeIcon icon={faHouse} /> Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/servicios">
                <FontAwesomeIcon icon={faHandshakeAngle} /> Servicios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/maquinaria">
                <FontAwesomeIcon icon={faScrewdriverWrench} /> Maquinaria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/nosotros">
                <FontAwesomeIcon icon={faUsers} /> Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contactanos">
                <FontAwesomeIcon icon={faComment} /> Contactanos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}