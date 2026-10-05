import ServiceCard from "./components/service-card";
import GalleryCarousel from "@/app/components/gallery-carousel";
import PageTitle from "../components/page-title";

import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

import { galleryMedia, services } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

/** Gallery preview cap — aligned with the AGENTS preview rule. */
const PREVIEW_IMAGE_LIMIT = 3;

export const metadata = pageMetadata({
  title: "Servicios",
  description:
    "Página referente a la información de nuestros servicios en A&M Dynamic Tools S.A.",
  path: "/servicios",
});

/**
 * Services page: page hero, service cards (expandable descriptions) and an
 * image gallery preview linking to the full gallery page.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The servicios page content.
 */
export default function ServicesPage() {
  return (
    <>
      {/* Page hero — title banner from services imagery */}
      <PageTitle
        imageSrc="/images/servicios/servicios_page.jpg"
        title="Servicios"
        subtitle="En este apartado podrás encontrar todos los servicios que ofrecemos"
      />
      {/* CTA to the full gallery */}
      <div className="mb-14 text-center">
        <Button asChild variant="secondary">
          <Link href="/galeria">
            <ImageIcon aria-hidden="true" className="size-5" /> Ver Galería
          </Link>
        </Button>
      </div>
      {/* Service cards — stable keys from the service title */}
      <section className="mb-14">
        {services.map((servicio) => (
          <ServiceCard
            key={servicio.title}
            title={servicio.title}
            description={servicio.description}
          />
        ))}
      </section>
      <hr className="my-14 border-t border-border" />
      {/* Gallery preview — capped at PREVIEW_IMAGE_LIMIT (full set in /galeria) */}
      <section id="imagenes">
        <h2 className="text-center text-h2 font-bold text-ink">Galería</h2>
        <p className="mt-3 text-center font-semibold text-ink-muted">
          Ejemplos de trabajos realizados en el taller
        </p>
        <div className="mt-4 mb-6 text-center">
          <Badge
            asChild
            variant="default"
            className="px-3 py-1 font-bold [a&]:hover:bg-secondary"
          >
            <Link href="/galeria">Ver más</Link>
          </Badge>
        </div>
        <GalleryCarousel
          items={galleryMedia.images.slice(0, PREVIEW_IMAGE_LIMIT)}
          ariaLabel="Galería de imágenes de servicios"
          allowFullscreen
        />
      </section>
    </>
  );
}
