"use client";

import Image from "./image";

import { MessageCircleMore, Phone, Menu, X } from "lucide-react";

import Link from "next/link";

import { contactoDirecto } from "@/lib/data";
import { navbarLinks } from "@/lib/site-navigation";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/app/components/ui/sheet";
import ContactAction from "@/app/components/contact-actions";
import { Button } from "@/app/components/ui/button";

/**
 * Fixed top navbar: brand logo + desktop link row with contact actions, and
 * a mobile/tablet menu inside a Radix `Sheet` (focus trap, Escape and aria
 * come free from Radix; nothing is wired by hand).
 *
 * Migration notes: nav entries are owned by `@/lib/site-navigation`;
 * scroll lock / focus restoration are native Radix; hover/focus touches are
 * styled with Tailwind utility classes (no co-located CSS).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The fixed navbar markup.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the mobile Sheet (data flows through Radix's `onOpenChange`).
   *
   * @param {boolean} open True to open the menu.
   * @returns {void}
   */
  const setOpen = (open) => setIsOpen(open);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 h-navbar rounded-b-sm bg-primary text-white opacity-[0.98]">
      {/* Shell container — shared tokens align with layout + footer */}
      <div className="mx-auto flex h-full w-full max-w-content items-center justify-between px-gutter">
        {/* Brand logo link */}
        <Link
          className="flex shrink-0 items-center transition-transform duration-200 ease-out-soft hover:scale-[1.03] motion-reduce:hover:scale-100"
          href="/"
        >
          <Image
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

        {/* Desktop: link row + contact actions (lg+ always visible) */}
        <div className="ml-4 hidden flex-1 lg:flex lg:items-center">
          {/* Links list */}
          <ul className="flex items-center gap-0.5 min-[1360px]:gap-1">
            {navbarLinks.map(({ href, icon: Icon, label, ariaCurrentPage }) => (
              <li key={href}>
                <Link
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-small font-medium text-white/90 transition-colors hover:text-white min-[1360px]:px-3 min-[1360px]:text-body"
                  aria-current={ariaCurrentPage ? "page" : undefined}
                  href={href}
                >
                  <Icon aria-hidden="true" className="size-5" /> {label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Contact actions */}
          <div className="ml-auto flex items-center gap-2">
            <ContactAction
              href={contactoDirecto.telefonoHref}
              aria-label={`Llamar al ${contactoDirecto.telefono}`}
            >
              <Phone aria-hidden="true" className="size-5" />
              <span className="hidden min-[1360px]:inline">Llamar</span>
              <span className="min-[1360px]:hidden">Llamar</span>
            </ContactAction>
            <ContactAction
              whatsapp
              href={contactoDirecto.whatsappHref}
              aria-label="Escribir por WhatsApp"
            >
              <MessageCircleMore aria-hidden="true" className="size-5" />
              <span className="hidden min-[1360px]:inline">WhatsApp</span>
              <span className="min-[1360px]:hidden">WhatsApp</span>
            </ContactAction>
          </div>
        </div>

        {/* Mobile/tablet: menu inside a Radix Sheet (focus, Escape and aria */}
        {/* are Radix-provided; trigger/close hide on lg+ breakpoints) */}
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 focus-visible:outline-ring-dark lg:hidden"
              aria-label={
                isOpen
                  ? "Cerrar menú de navegación"
                  : "Abrir menú de navegación"
              }
            >
              <Menu aria-hidden="true" className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="bg-primary border-border/40 p-4 pt-3 shadow-lg rounded-bl-sm rounded-br-sm"
          >
            <SheetTitle className="text-white/90 sr-only">
              Menú de navegación
            </SheetTitle>
            {/* Slide close button (replaces the default XIcon styling of SheetContent) */}
            <div className="flex justify-end">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 focus-visible:outline-ring-dark"
                  aria-label="Cerrar menú de navegación"
                >
                  <X aria-hidden="true" className="size-6" />
                </Button>
              </SheetClose>
            </div>
            {/* Links list — each entry closes the Sheet on click */}
            <ul className="flex flex-col gap-1">
              {navbarLinks.map(
                ({ href, icon: Icon, label, ariaCurrentPage }) => (
                  <li key={href}>
                    <SheetClose asChild>
                      <Link
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-body font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        aria-current={ariaCurrentPage ? "page" : undefined}
                        href={href}
                      >
                        <Icon aria-hidden="true" className="size-5" /> {label}
                      </Link>
                    </SheetClose>
                  </li>
                ),
              )}
            </ul>
            {/* Contact actions — same buttons as desktop, centered/flexed */}
            <div className="flex items-center gap-2 pb-2">
              <SheetClose asChild>
                <ContactAction
                  className="flex-1"
                  href={contactoDirecto.telefonoHref}
                  aria-label={`Llamar al ${contactoDirecto.telefono}`}
                >
                  <Phone aria-hidden="true" className="size-5" /> Llamar
                </ContactAction>
              </SheetClose>
              <SheetClose asChild>
                <ContactAction
                  whatsapp
                  className="flex-1"
                  href={contactoDirecto.whatsappHref}
                  aria-label="Escribir por WhatsApp"
                >
                  <MessageCircleMore aria-hidden="true" className="size-5" />{" "}
                  WhatsApp
                </ContactAction>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
