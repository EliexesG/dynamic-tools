import { maquinariaInfo } from '@/lib/data';
import TarjetaMaquina from './components/tarjetaMaquinaria';
import TituloPagina from '../components/tituloPagina';

export const metadata = {
    title: 'Maquinaria'
}

export default function Maquinaria () {

    return (
        <>
            <TituloPagina url={maquinariaInfo.urlImagenPresentacion} titulo={'Maquinaria'} texto={'En este apartado podrás encontrar los equipos con los que contamos'} />
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