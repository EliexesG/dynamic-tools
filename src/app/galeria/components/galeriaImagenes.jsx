"use client";
import "./galeriaImagenes.css";
import Imagen from "@/app/components/Imagen";

export default function GaleriaImagenes({ imagenes }) {
  return (
    <section className="galeriaImagenes">
      <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
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
