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
        className="text-center p-3 rounded bg-primary text-white font-bold mb-4 text-2xl"
      >
        {titulo}
      </h2>
      <article className="flex flex-col justify-center items-start">
        <div className="w-full p-3">
          {descripcion.split("|").map((parrafo, index) => (
            <p
              className={`${
                index === 0
                  ? "font-bold text-center text-xl border-secondary mb-3"
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
