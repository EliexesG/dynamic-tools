import { nosotrosInfo } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

import PageTitle from "../components/page-title";
import AboutSection from "@/app/components/about-section";
import ValueCard from "./components/value-card";

import { HeartHandshake, Users, Eye, Map, MapPin } from "lucide-react";

import { Button } from "@/app/components/ui/button";

// In-page anchor nav — variants alternate to visually pair the entries
const anchorLinks = [
  {
    href: "#who-we-are",
    icon: Users,
    label: "Quienes Somos",
    variant: "secondary",
  },
  {
    href: "#values",
    icon: HeartHandshake,
    label: "Valores",
    variant: "default",
  },
  { href: "#vision", icon: Eye, label: "Visión", variant: "secondary" },
  { href: "#mission", icon: Map, label: "Misión", variant: "default" },
  { href: "#location", icon: MapPin, label: "Ubicación", variant: "secondary" },
];

export const metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Página referente a la información sobre nosotros en A&M Dynamic Tools S.A.",
  path: "/nosotros",
});

/**
 * About page: page hero, anchor button row, company facts as about
 * sections, values card grid and the location column with the embedded
 * map. Server component; the only interactive markup is anchor links and
 * the embedded iframe (no client islands needed).
 *
 * Security note: the map iframe HTML comes exclusively from `src/lib/data.js`
 * (internal, reviewed content) — never from user input.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The nosotros page content.
 */
export default function AboutPage() {
  return (
    <>
      {/* Page hero — title banner from data.js */}
      <PageTitle
        imageSrc={nosotrosInfo.urlImagenPresentacion}
        title={"Nosotros"}
        subtitle={
          "En este apartado podrás encontrar toda la información sobre nosotros"
        }
      />
      {/* Anchor buttons — jump to each about section */}
      <div
        id="anchor-buttons"
        className="mb-14 flex flex-wrap justify-center gap-2"
      >
        {anchorLinks.map(({ href, icon: Icon, label, variant }) => (
          <Button
            asChild
            key={href}
            variant={variant}
            className="hover:bg-primary"
          >
            <a href={href}>
              <Icon aria-hidden="true" className="size-5" /> {label}
            </a>
          </Button>
        ))}
      </div>
      {/* About sections — anchor-backed content from data.js */}
      <AboutSection
        anchorId="who-we-are"
        title={nosotrosInfo.informacionPrincipal.titulo}
        description={nosotrosInfo.informacionPrincipal.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      <AboutSection
        anchorId="values"
        title={nosotrosInfo.informacionValores.titulo}
        description={nosotrosInfo.informacionValores.descripcion}
      />
      {/* Values — stable keys from the value title */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {nosotrosInfo.informacionValores.valores.map((valor) => (
          <ValueCard
            key={valor.titulo}
            title={valor.titulo}
            description={valor.descripcion}
          />
        ))}
      </section>
      <hr className="my-14 border-t border-border" />
      <AboutSection
        anchorId="vision"
        title={nosotrosInfo.informacionVision.titulo}
        description={nosotrosInfo.informacionVision.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      <AboutSection
        anchorId="mission"
        title={nosotrosInfo.informacionMision.titulo}
        description={nosotrosInfo.informacionMision.descripcion}
      />
      <hr className="my-14 border-t border-border" />
      {/* Location — about section beside the embedded map */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AboutSection
          anchorId="location"
          title={nosotrosInfo.informacionUbicacion.titulo}
          description={nosotrosInfo.informacionUbicacion.descripcion}
        />
        {/* Map — iframe HTML from data.js (trusted, internal only) */}
        <div
          title="mapa"
          className="flex min-h-75 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-muted [&_iframe]:h-full [&_iframe]:min-h-75 [&_iframe]:w-full"
          dangerouslySetInnerHTML={{
            __html: nosotrosInfo.informacionUbicacion.html,
          }}
        />
      </section>
    </>
  );
}
