"use client";

import Imagen from "./Imagen";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";

import {
  User,
  Contact,
  Image,
  Handshake,
  ToolCase,
  Menu,
  House,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const opcionesMenu = [
    { href: "/", icono: House, titulo: "Inicio" },
    { href: "/servicios", icono: Handshake, titulo: "Servicios" },
    { href: "/maquinaria", icono: ToolCase, titulo: "Maquinaria" },
    { href: "/galeria", icono: Image, titulo: "Galería" },
    { href: "/nosotros", icono: User, titulo: "Nosotros" },
    { href: "/contactanos", icono: Contact, titulo: "Contactanos" },
  ];

  const currentURL = usePathname();
  const tamannoMinimo = 850;
  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => setEsMobile(window.innerWidth < tamannoMinimo), []);

  window?.addEventListener("resize", () => {
    setEsMobile(window.innerWidth < tamannoMinimo);
  });

  return (
    <nav className="fixed top-0 z-50 w-full bg-primary text-primary-foreground shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-90 transition"
        >
          <Imagen
            src="/images/logos/small_size_logo.png"
            alt="A&M Dynamic Tools S.A. Logo"
            width={55}
            height={49}
            className="me-2 rounded"
          />
          <span className="text-lg font-medium">A&M Dynamic Tools S.A.</span>
        </Link>

        {/* Menu options for desktop */}
        {!esMobile && (
          <NavigationMenu>
            <NavigationMenuList>
              {opcionesMenu.map((opcion, i) => {
                const isActive = currentURL === opcion.href;
                const Icon = opcion.icono;

                return (
                  <NavigationMenuLink
                    key={i}
                    asChild
                    className={isActive ? "bg-secondary" : ""}
                  >
                    <Link
                      href={opcion.href}
                      className="flex flex-row items-center transition group/navbar-link"
                      onClick={(e) => e.currentTarget.blur()}
                    >
                      <Icon
                        size={16}
                        className={
                          "text-white group-hover/navbar-link:text-black"
                        }
                      />
                      <span className="ms-2">{opcion.titulo}</span>
                    </Link>
                  </NavigationMenuLink>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile menu button */}
        {esMobile && (
          <NavigationMenu
            className={"[&_div.absolute]:left-auto [&_div.absolute]:right-0"}
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary text-primary-foreground">
                  <Menu />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded shadow-lg">
                  {opcionesMenu.map((opcion, i) => (
                    <NavigationMenuLink key={i} asChild>
                      <Link
                        href={opcion.href}
                        className="flex flex-row items-center gap-2 px-3 py-2"
                        onClick={(e) => e.currentTarget.blur()}
                      >
                        <opcion.icono size={16} />
                        {opcion.titulo}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </nav>
  );
}
