import Imagen from "./Imagen";

export default function TituloPagina({ url, titulo, texto }) {
  return (
    <div className="rounded-lg shadow-2xl mb-4 relative! w-full h-[400px] bg-black">
      <Imagen
        src={url}
        alt={titulo}
        height={1000}
        width={1000}
        className="rounded-lg mx-auto block h-full w-full object-scale-down brightness-50"
      />
      <div className="text-center text-white absolute w-full h-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <h1 className="text-3xl font-bold">{titulo}</h1>
        <p className="font-bold">{texto}</p>
      </div>
    </div>
  );
}
