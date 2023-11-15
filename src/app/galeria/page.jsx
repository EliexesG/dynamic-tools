import { galeriaInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";
import GaleriaImagenes from "./components/galeriaImagenes";


export default function Galeria () {
    return (<>
        <TituloPagina url={galeriaInfo.urlImagenPresentacion} titulo={galeriaInfo.titulo} texto={galeriaInfo.descripcion} />
        <GaleriaImagenes imagenes={galeriaInfo.imagenes} />
    </>)
}