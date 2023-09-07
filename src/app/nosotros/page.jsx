import { nosotrosInfo } from "@/lib/data";

import TituloPagina from "../components/tituloPagina";

export const metadata = {
    title: 'Nosotros'
}

export default function Nosotros () {
    return (
        <>
            <TituloPagina url={nosotrosInfo.urlImagenPresentacion} titulo={'Nosotros'} texto={'En este apartado podrás encontrar toda la información sobre nosotros'} />
        </>
    );
}