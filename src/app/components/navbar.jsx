'use client'

import './navbar.css';

import Imagen from './Imagen';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, 
         faHandshakeAngle, 
         faScrewdriverWrench, 
         faUsers, 
         faComment } 
from "@fortawesome/free-solid-svg-icons";

import Link from 'next/link';

import { useRef } from 'react';

export default function Navbar () {

  const collapseDiv = useRef(null);
  const collapseButton = useRef(null);

  const handleCollapse = (e) => {

    collapseDiv.current.classList.remove('show', 'collapse')
    collapseDiv.current.classList.add('collapsing')
    collapseButton.current.classList.add('collapsed')
    collapseButton.current.setAttribute('aria-expanded', false)
    collapseDiv.current.classList.remove('collapsing')
    collapseDiv.current.classList.add('collapse')  
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary position-fixed w-100 top-0 z-3 bg-gradient">
        <div className="container-fluid">
        <Link className="navbar-brand align-items-center" href="/" onClick={handleCollapse}>
          <Imagen src={'/images/logos/small_size_logo.png'} alt="brand-logo" width={55} height={49} className="me-2 rounded"/>
          <span>A&M Dynamic Tools S.A.</span>
        </Link>
          <button ref={collapseButton} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarOpciones" aria-controls="navbarOpciones" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarOpciones" ref={collapseDiv}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/" onClick={handleCollapse}>
                <FontAwesomeIcon icon={faHouse} /> Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/servicios" onClick={handleCollapse}>
                <FontAwesomeIcon icon={faHandshakeAngle} /> Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/maquinaria" onClick={handleCollapse}>
                <FontAwesomeIcon icon={faScrewdriverWrench} /> Maquinaria</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/nosotros" onClick={handleCollapse}>
                <FontAwesomeIcon icon={faUsers} /> Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contactanos" onClick={handleCollapse}>
                <FontAwesomeIcon icon={faComment} /> Contactanos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}