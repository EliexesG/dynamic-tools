import AboutSection from "@/app/components/about-section";
import PageTitle from "../components/page-title";

import ValueCard from "./components/value-card";

import { HeartHandshake, Users, Eye, Map, MapPin } from "lucide-react";

import { Button } from "@/app/components/ui/button";

import { companyValues } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

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

// Hero image at module scope — shared by `metadata` (OG image) and the
// `<PageTitle>` markup below (component-scoped consts can't reach it).
const heroImage = "/images/nosotros/nosotros_page.jpg";

export const metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Página referente a la información sobre nosotros en A&M Dynamic Tools S.A.",
  path: "/nosotros",
  image: heroImage,
});

/**
 * About page: page hero, anchor button row, company facts as about
 * sections, values card grid and the location column with the embedded
 * map. Server component; the only interactive markup is anchor links and
 * the embedded iframe (no client islands needed).
 *
 * User-visible copy is written directly inline in the JSX (site contract:
 * long copy uses multi-line template literals; `about-section.jsx` trims
 * the `|` segments so indentation is free).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The nosotros page content.
 */
export default function AboutPage() {
  return (
    <>
      {/* Page hero — title banner from about imagery */}
      <PageTitle
        imageSrc={heroImage}
        title="Nosotros"
        subtitle="En este apartado podrás encontrar toda la información sobre nosotros"
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
      {/* Who we are — full version (the home page carries a 3-paragraph teaser) */}
      <AboutSection
        anchorId="who-we-are"
        title="¿Quienes Somos? (Lo que nos Hace Únicos)"
        description={`En A&M Dynamic Tools, nos enorgullece ser una entidad siempre
          confiable en nuestro campo.|
          Nos destacamos por nuestra pasión, innovación y dedicación hacia
          nuestros clientes. Lo que nos hace únicos es nuestra capacidad para
          ofrecer soluciones personalizadas y adaptadas a las necesidades
          específicas de cada proyecto.|
          Nuestro equipo de profesionales altamente capacitados y experimentados
          se compromete a brindar resultados excepcionales. Nos esforzamos por
          superar las expectativas y entregar productos y servicios de la más
          alta calidad.|
          Además, nos diferenciamos por nuestra ética de trabajo, integridad y
          enfoque en establecer relaciones sólidas con nuestros clientes.
          Valoramos la confianza y la transparencia en todas nuestras
          interacciones, lo que nos permite construir asociaciones a largo
          plazo basadas en la satisfacción mutua.|
          En A&M Dynamic Tools, nos apasiona impulsar el éxito de nuestros
          clientes y estamos dedicados a ser su socio confiable en el logro de
          sus objetivos. Trabajamos incansablemente para mantenernos a la
          vanguardia de la industria, adoptando tecnologías y enfoques
          innovadores para mantenernos a la cabeza del mercado.|
          Explora nuestra empresa y descubre cómo nuestra experiencia, calidad
          y compromiso nos hacen únicos en el sector. ¡Permítenos ser parte de
          tu éxito!`}
      />
      <hr className="my-14 border-t border-border" />
      {/* Values — intro section + card grid (stable keys) */}
      <AboutSection
        anchorId="values"
        title="Los Valores que nos Caracterizan"
        description={`Nuestro Compromiso con la Excelencia y la Integridad.|
          En A&M Dynamic Tools, nos regimos por un conjunto de valores
          fundamentales que guían todas nuestras acciones y decisiones. Estos
          valores son la base de nuestra cultura empresarial y reflejan nuestro
          compromiso con la excelencia y la integridad en todo lo que hacemos.`}
      />
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {companyValues.map((value) => (
          <ValueCard
            key={value.title}
            title={value.title}
            description={value.description}
          />
        ))}
      </section>
      <hr className="my-14 border-t border-border" />
      {/* Vision */}
      <AboutSection
        anchorId="vision"
        title="Nuestra Visión"
        description={`Ser la opción líder para nuestros clientes en ingeniería de
          vanguardia.|
          Ofrecemos un sólido respaldo en diseño mecánico, metalmecánica,
          mecanizado e integración de sistemas hidráulicos, neumáticos y control
          eléctrico. Representamos nuestra marca con valores fundamentales de
          confianza, responsabilidad e integridad. ¡Nos esforzamos por superar
          las expectativas y ser tu socio confiable en el éxito de tus
          proyectos!`}
      />
      <hr className="my-14 border-t border-border" />
      {/* Mission */}
      <AboutSection
        anchorId="mission"
        title="Nuestra Misión"
        description={`Proporcionar a nuestros clientes una perspectiva adicional
          para la resolución de problemas en diseño y fabricación en proyectos
          de ingeniería.|
          A través del uso de herramientas de CAD/CAM y tecnología CNC,
          generamos un valor agregado al ofrecer experiencia en diversas
          industrias, como médica, alimenticia, diseño, mantenimiento,
          fabricación y ensamble de moldes. Nos comprometemos a brindar
          soluciones innovadoras y de calidad, impulsando el éxito y la
          satisfacción de nuestros clientes en cada proyecto.`}
      />
      <hr className="my-14 border-t border-border" />
      {/* Location — about section beside the embedded map */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AboutSection
          anchorId="location"
          title="¿Dónde nos Ubicamos?"
          description="Para que puedas ubicarnos de forma más sencilla."
        />
        {/* Map — iframe embed written inline (config content, never user input) */}
        <div
          title="mapa"
          className="flex min-h-75 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-muted [&_iframe]:h-full [&_iframe]:min-h-75 [&_iframe]:w-full"
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.2898400034804!2d-84.21890687811525!3d10.003692238385685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f95f4b047b5f%3A0xe94ccee130656719!2sA%26M%20DynamicTools%20S.A!5e0!3m2!1sen!2scr!4v1694120360882!5m2!1sen!2scr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
          }}
        />
      </section>
    </>
  );
}
