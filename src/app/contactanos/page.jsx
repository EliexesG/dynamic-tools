import ContactCard from "./components/contact-card";
import ContactForm from "./components/contact-form";
import PageTitle from "../components/page-title";

import { contactosInfo } from "@/lib/data";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Contáctanos",
  description:
    "Página referente a la información de nuestros contactos de A&M Dynamic Tools S.A.",
  path: "/contactanos",
});

/**
 * Contact us page: page hero, contact card grid (derived from `data.js`)
 * and the submission form card. Server component; interactivity lives in
 * its child components (`ContactCard`, `ContactForm`).
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The contactanos page content.
 */
export default function ContactPage() {
  return (
    <>
      {/* Page hero — title banner from data.js */}
      <PageTitle
        imageSrc={contactosInfo.urlImagenPresentacion}
        title={contactosInfo.titulo}
        subtitle={contactosInfo.descripcion}
      />
      {/* Contact card grid — one card per contact entry in data.js */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {contactosInfo.contactos.map((entry) => (
          <ContactCard
            key={entry.titulo}
            title={entry.titulo}
            specialty={entry.especialidad}
            contacts={entry.contactos}
          />
        ))}
      </section>
      {/* Submission form — client island handled by contact-form.jsx */}
      <ContactForm />
    </>
  );
}
