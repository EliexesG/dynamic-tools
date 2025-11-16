export default function InformacionPlana({
  id,
  titulo,
  descripcion,
  className,
}) {
  return (
    <section className={`mb-4 ${className}`}>
      <h2
        id={id}
        className="text-center p-3 rounded text-white font-bold mb-4 text-2xl bg-gradient-to-r from-primary to-gray-800"
      >
        {titulo}
      </h2>
      <article className="flex flex-col justify-center items-start">
        <div className="w-full p-3">
          {descripcion.split("|").map((parrafo, index) => (
            <p
              className={`${
                index === 0
                  ? "font-bold text-center text-xl border-b-1 border-secondary mb-3 py-1"
                  : "text-justify"
              }`}
              key={index}
            >
              {parrafo}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}
