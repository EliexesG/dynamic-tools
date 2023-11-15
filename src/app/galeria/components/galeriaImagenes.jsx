"use client";

import { useState, useEffect } from "react";
import "./galeriaImagenes.css";
import Imagen from "@/app/components/Imagen";

export default function GaleriaImagenes({ imagenes }) {
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        
        if(pantallaCompleta === true) {
          handlePantallaCompleta(event);
        }

      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    
});

  const handlePantallaCompleta = (e) => {
    setPantallaCompleta(!pantallaCompleta);
    console.log('hola')
    if (pantallaCompleta) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <section>
      <h2 className="text-center p-3 rounded bg-primary text-white fw-bold mb-5">
        Imágenes (Trabajos)
      </h2>
      <div
        onClick={handlePantallaCompleta}
        className={`row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3 bg-light ${
          pantallaCompleta ? "pantallaCompleta" : "pantallaIncompleta"
        }`}
      >
        {imagenes.map((imagen) => (
          <div className="col-md-4" key={imagen.id}>
            <Imagen
              src={imagen.url}
              className={"rounded-4 imagen"}
              width={1000}
              height={1000}
              alt={"imagen galeria"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
