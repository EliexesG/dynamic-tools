import { Contact, Handshake, Image, ToolCase, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Footer() {
  const opcionesNavbar = [
    { href: "/servicios", icono: Handshake, titulo: "Servicios" },
    { href: "/maquinaria", icono: ToolCase, titulo: "Maquinaria" },
    { href: "/galeria", icono: Image, titulo: "Galería" },
    { href: "/nosotros", icono: User, titulo: "Nosotros" },
    { href: "/contactanos", icono: Contact, titulo: "Contactanos" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground w-full h-auto">
      <div className="flex flex-row gap-3 items-center justify-center pt-3">
        {opcionesNavbar.map((opcion, i) => (
          <Button variant={"link"} key={i} asChild>
            <Link href={opcion.href} className={"text-primary-foreground"}>
              <opcion.icono size={16}></opcion.icono>
              {opcion.titulo}
            </Link>
          </Button>
        ))}
      </div>
      <div className="text-center p-3">
        <p>
          Somos una empresa encargada de un taller de precisión que da soporte
          de ingeniería a clientes en los campos de diseño mecánico,
          metalmecánica, mecanizado, etc.
        </p>
      </div>
      <div className="text-center p-3">
        <p className="text-sm font-bold">
          © 2025 Copyright:
          <span className="text-white"> A&M Dynamic Tools S.A.</span>
        </p>
      </div>
    </footer>
  );
}
