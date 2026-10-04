import { Phone, Mail } from "lucide-react";

export default function TarjetaContacto({ titulo, especialidad, contactos }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03] motion-reduce:hover:scale-100">
      <div className="bg-primary px-4 py-3">
        <h2 className="text-center text-2xl font-bold text-white">{titulo}</h2>
        {especialidad !== "N/A" && (
          <h3 className="text-center text-xl font-bold text-white">
            {especialidad}
          </h3>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {contactos.map((contacto, index) => (
          <p className="text-black" key={index}>
            <a
              className="inline-flex items-center gap-2 rounded-md text-black no-underline transition-colors hover:text-gray-500"
              href={
                contacto.tipo.includes("Cel")
                  ? `tel:+506${contacto.detalle.replace(" ", "")}`
                  : `mailto:${contacto.detalle}`
              }
            >
              {contacto.tipo.includes("Cel") ? (
                <Phone aria-hidden="true" className="size-5" />
              ) : (
                <Mail aria-hidden="true" className="size-5" />
              )}{" "}
              {`${contacto.tipo}: ${contacto.detalle}`}
            </a>
          </p>
        ))}
      </div>
    </article>
  );
}
