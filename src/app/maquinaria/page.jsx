import { maquinariaInfo } from '@/lib/data';
import TarjetaMaquina from './components/tarjetaMaquinaria';
import TituloPagina from '../components/tituloPagina';

export const metadata = {
    title: 'Maquinaria',
    description: "Pagina referente a informacion acerca de las maquinas con las que contamos como empresa A&M Dynamic Tools S.A.",
    alternates: {
        canonical: "/maquinaria"
    }
}

export default function Maquinaria () {

    return (
        <>
            <TituloPagina url={maquinariaInfo.urlImagenPresentacion} titulo={maquinariaInfo.titulo} texto={maquinariaInfo.descripcion} />
            <div className='ps-2 pe-2'>
                {maquinariaInfo.maquinas.map((maquina, index) => (
                    <section key={index}>
                        <TarjetaMaquina titulo={maquina.titulo} descripcion={maquina.descripcion} imagenes={maquina.imagenes} />
                    </section>
                ))}
            </div>
        </>
    );
}