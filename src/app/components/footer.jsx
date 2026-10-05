import Link from "next/link";

import { footerLinks } from "@/lib/site-navigation";

/**
 * Application shell footer: site link grid, company summary and the
 * copyright bar. Server component (no state, no interactivity); nav entries
 * are plain links, not buttons, so no `ui/` primitive is involved.
 *
 * Nav entries are owned by `@/lib/site-navigation` (filtered `footerLinks`)
 * — do not keep a local copy here. Layout uses the shared shell tokens
 * (`max-w-content`, `px-gutter`) so the footer stays aligned with the
 * navbar and main content containers.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The footer markup, stretched to the bottom of the viewport by `mt-auto`.
 */
export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-primary text-white">
      <div className="mx-auto w-full max-w-content px-gutter">
        {/* Site links grid */}
        <nav aria-label="Navegación del pie de página" className="pt-8">
          <ul className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-5">
            {footerLinks.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  className="inline-flex items-center gap-2 font-bold uppercase text-white/80 transition-colors hover:text-white"
                  href={href}
                >
                  <Icon aria-hidden="true" className="size-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <hr className="my-2 border-white/15" />
        {/* Company summary */}
        <p className="mx-auto mt-6 mb-2 max-w-3xl text-center">
          Somos una empresa encargada de un taller de precisión que da soporte
          de ingeniería a clientes en los campos de diseño mecánico,
          metalmecánica, mecanizado, etc.
        </p>
      </div>
      {/* Copyright bar */}
      <p className="text-center p-3">
        © {new Date().getFullYear()} Copyright:
        <span className="text-white"> A&M Dynamic Tools S.A.</span>
      </p>
    </footer>
  );
}
