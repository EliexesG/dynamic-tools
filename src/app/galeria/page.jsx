import { galeriaInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";
import GaleriaImagenes from "./components/galeriaImagenes";
import GaleriaVideos from "./components/galeriaVideos";

export const metadata = {
  title: "Galería",
  description:
    "Página referente a la galería de imágenes y videos de los trabajos y proyectos de A&M Dynamic Tools S.A.",
  alternates: {
    canonical: "/galeria",
  },
};

export default function Galeria() {
  return (
    <>
      <TituloPagina
        url={galeriaInfo.urlImagenPresentacion}
        titulo={galeriaInfo.titulo}
        texto={galeriaInfo.descripcion}
      />
      <GaleriaImagenes imagenes={galeriaInfo.imagenes} />
      <hr className="mb-4 mt-4" />
      <GaleriaVideos videos={galeriaInfo.videos} />
    </>
  );
}
