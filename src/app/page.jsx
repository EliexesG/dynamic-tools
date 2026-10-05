import PageTitle from "./components/page-title";
import Image from "./components/image";
import AboutSection from "@/app/components/about-section";

import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@/app/components/ui/button";

import MachinePreviewCard from "./maquinaria/components/machine-preview-card";
import ServicePreviewCard from "./servicios/components/service-preview-card";

import { machines, services } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  description: "Taller de Ingeniería Mecánica en Precisión",
  path: "/",
});

/**
 * Home page: brand banner, page hero and the site teaser — company facts
 * (about sections, with the who-we-are teaser trimmed), service and
 * machinery preview card grids, and the contact CTA. Server component;
 * preview cards own their media islands (`gallery-carousel`).
 *
 * User-visible copy is written directly inline in the JSX (site contract:
 * long copy uses multi-line template literals; `about-section.jsx` trims
 * the `|` segments so indentation is free).
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
        title="¿Que Hacemos?"
        description={`Somos una empresa encargada de un taller de precisión.|
          Damos soporte de ingeniería a clientes en los campos de diseño mecánico,
          metalmecánica, mecanizado e integración de sistemas hidráulicos,
          neumáticos y control eléctrico, representando nuestra marca con valores
          de confianza, responsabilidad e integridad.`}
      />
      {/* Who we are — trimmed teaser (full version lives in /nosotros page.jsx —
          keep these two copy blocks in sync) */}
      <AboutSection
        anchorId="who-we-are"
        title="¿Quienes Somos?"
        description={`En A&M Dynamic Tools, nos enorgullece ser una entidad
          siempre confiable en nuestro campo.|
          Nos destacamos por nuestra pasión, innovación y dedicación hacia
          nuestros clientes. Lo que nos hace únicos es nuestra capacidad para
          ofrecer soluciones personalizadas y adaptadas a las necesidades
          específicas de cada proyecto.|
          Nuestro equipo de profesionales altamente capacitados y experimentados
          se compromete a brindar resultados excepcionales. Nos esforzamos por
          superar las expectativas y entregar productos y servicios de la más
          alta calidad.`}
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
        title="Servicios"
        description="Algunos de los servicios que ofrecemos"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <ServicePreviewCard
            key={service.title}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      {/* Machinery — intro section + preview card grid (stable keys) */}
      <AboutSection
        anchorId="maquinaria"
        title="Maquinaria"
        description="Algunas de las máquinas a nuestra disposición"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {machines.slice(0, 3).map((machine) => (
          <MachinePreviewCard key={machine.title} machine={machine} />
        ))}
      </div>
      <hr className="my-14 border-t border-border" />
      {/* Contact — intro section + CTA */}
      <AboutSection
        anchorId="contactos"
        title="Contáctanos"
        description="Para contactarnos da click aquí o llámanos por teléfono o WhatsApp"
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
