"use client";

import "./navbar.css";

import Imagen from "./Imagen";

import {
  House,
  HeartHandshake,
  Wrench,
  Users,
  MessageCircle,
  MessageCircleMore,
  Image as ImageIcon,
  Phone,
} from "lucide-react";

import Link from "next/link";

import { contactoDirecto } from "@/lib/data";

import { useCallback, useEffect, useState } from "react";

const enlaces = [
  { href: "/", icon: House, label: "Inicio", ariaCurrent: true },
  { href: "/servicios", icon: HeartHandshake, label: "Servicios" },
  { href: "/maquinaria", icon: Wrench, label: "Maquinaria" },
  { href: "/galeria", icon: ImageIcon, label: "Galería" },
  { href: "/nosotros", icon: Users, label: "Nosotros" },
  { href: "/contactanos", icon: MessageCircle, label: "Contáctanos" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 h-navbar bg-primary text-white">
      <div className="mx-auto flex h-full w-full max-w-content items-center justify-between px-gutter">
        <Link
          className="flex shrink-0 items-center transition-transform duration-200 ease-out-soft hover:scale-[1.03] motion-reduce:hover:scale-100"
          href="/"
          onClick={closeMenu}
        >
          <Imagen
            src={"/images/logos/small_size_logo.png"}
            alt="brand-logo"
            width={44}
            height={39}
            className="me-2 rounded"
          />
          <span className="whitespace-nowrap text-body font-medium text-white">
            A&M Dynamic Tools S.A.
          </span>
        </Link>
        <button
          type="button"
          className="navbar-toggler inline-flex size-11 items-center justify-center rounded-md text-white lg:hidden"
          aria-controls="navbarOpciones"
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
          }
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-menu${isOpen ? " navbar-menu--open" : ""}`}
          id="navbarOpciones"
        >
          <div className="navbar-menu__inner">
            <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0.5 min-[1360px]:gap-1">
              {enlaces.map(({ href, icon: Icono, label, ariaCurrent }) => (
                <li key={href}>
                  <Link
                    className="nav-link flex items-center gap-2 rounded-md px-2 py-2 text-small font-medium text-white/90 transition-colors hover:text-white min-[1360px]:px-3 min-[1360px]:text-body"
                    aria-current={ariaCurrent ? "page" : undefined}
                    href={href}
                    onClick={closeMenu}
                  >
                    <Icono aria-hidden="true" className="size-5" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-2 pb-2 lg:mt-0 lg:ml-auto lg:pb-0">
              <a
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-secondary px-3 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-dark"
                href={contactoDirecto.telefonoHref}
                aria-label={`Llamar al ${contactoDirecto.telefono}`}
              >
                <Phone aria-hidden="true" className="size-5" />
                <span className="lg:hidden min-[1360px]:inline">Llamar</span>
              </a>
              <a
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/40 px-3 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring-dark"
                href={contactoDirecto.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
              >
                <MessageCircleMore aria-hidden="true" className="size-5" />
                <span className="lg:hidden min-[1360px]:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
