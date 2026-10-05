import Link from "next/link";

import { SquareArrowOutUpRight } from "lucide-react";

import PageTitle from "./components/page-title";
import Image from "./components/image";
import AboutSection from "@/app/components/about-section";

import { Button } from "@/app/components/ui/button";

import MachinePreviewCard from "./maquinaria/components/machine-preview-card";
import ServicePreviewCard from "./servicios/components/service-preview-card";

import {
  nosotrosInfo,
  serviciosInfo,
  maquinariaInfo,
  contactosInfo,
} from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

// Home-only trims over `data.js` content (the full version lives in /nosotros):
const PRINCIPAL_BADGE = " (Lo que nos Hace Únicos)";
const PRINCIPAL_PREVIEW_LINES = 3; // lead + 2 body paragraphs in the teaser

export const metadata = pageMetadata({
  description: "Taller de Ingeniería Mecánica en Precisión",
  path: "/",
});

/**
 * Home page: brand banner, page hero and the site teaser — company facts
 * (about sections, with the "who we are" entry trimmed), service and
 * machinery preview card grids, and the contact CTA. Server component;
 * preview cards own their media islands (`gallery-carousel`).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The inicio page content.
 */
export default function Home() {
  return (
    <>
      {/* Brand banner — full-width logo strip over a primary hairline */}
      <div className="mb-6 flex w-full justify-center border-b border-primary pb-2">
        <Image
          alt="Logo Completo"
          src="/images/logos/full_size_logo.jpeg"
          height={80}
          width={180}
        />
      </div>
      {/* Page hero — title banner from home imagery */}
      <PageTitle
        imageSrc="/images/inicio/inicio_page.jpg"
        title="A&M Dynamic Tools S.A."
        subtitle="Taller de Ingeniería Mecánica en Precisión"
      />
      {/* What we do — company facts intro */}
      <AboutSection
        anchorId="what-we-do"
        title={nosotrosInfo.informacionQueHacemos.titulo}
        description={nosotrosInfo.informacionQueHacemos.descripcion}
      />
      {/* Who we are — trimmed for the home teaser (full version in /nosotros) */}
      <AboutSection
        anchorId="who-we-are"
        title={nosotrosInfo.informacionPrincipal.titulo.replace(
          PRINCIPAL_BADGE,
          "",
        )}
        description={nosotrosInfo.informacionPrincipal.descripcion
          .split("|")
          .slice(0, PRINCIPAL_PREVIEW_LINES)
          .join("|")}
      />
      {/* CTA to the about page */}
      <div className="mb-14 text-center">
        <Button asChild variant="secondary">
          <Link href="/nosotros">
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
            {" Ver más"}
          </Link>
        </Button>
      </div>
      <hr className="my-14 border-t border-border" />
      {/* Services — intro section + preview card grid (stable keys) */}
      <AboutSection
        anchorId="servicios"
        title={serviciosInfo.titulo}
        description={serviciosInfo.descripcionInicio}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {serviciosInfo.servicios.slice(0, 3).map((servicio) => (
          <ServicePreviewCard
            key={servicio.titulo}
            title={servicio.titulo}
            description={servicio.descripcion}
          />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      {/* Machinery — intro section + preview card grid (stable keys) */}
      <AboutSection
        anchorId="maquinaria"
        title={maquinariaInfo.titulo}
        description={maquinariaInfo.descripcionInicio}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {maquinariaInfo.maquinas.slice(0, 3).map((maquina) => (
          <MachinePreviewCard key={maquina.titulo} machine={maquina} />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      {/* Contact — intro section + CTA */}
      <AboutSection
        anchorId="contactos"
        title={contactosInfo.titulo}
        description={contactosInfo.descripcionInicio}
      />
      <div className="flex justify-center">
        <Button asChild variant="secondary">
          <Link href="/contactanos">
            <SquareArrowOutUpRight aria-hidden="true" className="size-5" />{" "}
            Contáctanos
          </Link>
        </Button>
      </div>
    </>
  );
}
