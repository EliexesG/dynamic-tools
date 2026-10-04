export default function InformacionPlana({
  id,
  titulo,
  descripcion,
  className,
}) {
  return (
    <section className={`mb-6 ${className ?? ""}`}>
      <h2
        id={id}
        className="scroll-mt-24 rounded-lg bg-primary px-4 py-3 text-center text-h2 font-bold text-white"
      >
        {titulo}
      </h2>
      <div
        className="mx-auto mt-3 h-1 w-16 rounded-full bg-secondary"
        aria-hidden="true"
      />
      <article className="mt-6">
        {descripcion.split("|").map((parrafo, index) => (
          <p
            key={index}
            className={
              index === 0
                ? "mb-4 border-b border-secondary pb-2 text-center text-body-lg font-semibold"
                : "mb-4 text-justify text-body last:mb-0"
            }
          >
            {parrafo}
          </p>
        ))}
      </article>
    </section>
  );
}
