import { galeriaInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";
import GaleriaImagenes from "./components/galeriaImagenes";
import GaleriaVideos from "./components/galeriaVideos";


export default function Galeria () {
    return (<>
        <TituloPagina url={galeriaInfo.urlImagenPresentacion} titulo={galeriaInfo.titulo} texto={galeriaInfo.descripcion} />
        <GaleriaImagenes imagenes={galeriaInfo.imagenes} />
        <hr className="mb-4 mt-4" />
        <GaleriaVideos videos={galeriaInfo.videos} />
    </>)
}