import Imagen from "./Imagen";

export default function TituloPagina({ url, titulo, texto }) {
  return (
    <>
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <Imagen
          id="imagenTitulo"
          src={url}
          alt={titulo}
          height={3000}
          width={3000}
          sizes="100vw"
          className="h-[240px] w-full object-cover sm:h-[320px] lg:h-[400px]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/60"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1
            id="tituloPaginaTitulo"
            className="text-4xl font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] md:text-5xl"
          >
            {titulo}
          </h1>
          <p
            id="textoPaginaTitulo"
            className="text-lg text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
          >
            {texto}
          </p>
        </div>
      </div>
      <hr className="mb-6" />
    </>
  );
}
