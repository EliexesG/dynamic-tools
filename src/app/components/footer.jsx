import { House, HeartHandshake, Wrench, Users, MessageCircle } from "lucide-react";

import Link from "next/link";

const enlaces = [
  { href: "/", icon: House, label: "Inicio" },
  { href: "/servicios", icon: HeartHandshake, label: "Servicios" },
  { href: "/maquinaria", icon: Wrench, label: "Maquinaria" },
  { href: "/nosotros", icon: Users, label: "Nosotros" },
  { href: "/contactanos", icon: MessageCircle, label: "Contáctanos" },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-primary text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <nav aria-label="Navegación del pie de página" className="pt-8">
          <ul className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
            {enlaces.map(({ href, icon: Icono, label }) => (
              <li key={href}>
                <Link
                  className="inline-flex items-center gap-2 font-bold uppercase text-white/80 transition-colors hover:text-white"
                  href={href}
                >
                  <Icono aria-hidden="true" className="size-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="my-2 border-white/15" />
        <p className="mx-auto mt-6 mb-2 max-w-3xl text-center">
          Somos una empresa encargada de un taller de precisión que da soporte
          de ingeniería a clientes en los campos de diseño mecánico,
          metalmecánica, mecanizado, etc.
        </p>
      </div>
      <p className="text-center p-3">
        © {new Date().getFullYear()} Copyright:
        <span className="text-white"> A&M Dynamic Tools S.A.</span>
      </p>
    </footer>
  );
}
