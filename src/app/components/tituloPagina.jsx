import Imagen from "./Imagen";

/**
 * TituloPagina component
 *
 * @param {string} url - The URL of the image.
 * @param {string} titulo - The title of the page.
 * @param {string} texto - The text to be displayed below the title.
 *
 * @returns {JSX.Element} - The JSX element representing the TituloPagina component.
 */
export default function TituloPagina({ url, titulo, texto }) {
  return (
    <div className="rounded-lg shadow-2xl mb-4 relative! w-full h-[400px] bg-gradient-to-r from-primary to-gray-800">
      <Imagen
        src={url}
        alt={titulo}
        height={1000}
        width={1000}
        className="rounded-lg mx-auto block h-full w-full object-scale-down brightness-50"
      />
      <div className="text-white absolute w-full h-auto top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl font-bold">{titulo}</h1>
        <p className="font-bold w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {texto}
        </p>
      </div>
    </div>
  );
}
