import ContactCard from "./components/contact-card";
import ContactForm from "./components/contact-form";
import PageTitle from "../components/page-title";

import { contacts } from "@/lib/data";
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
      {/* Page hero — title banner from contact imagery */}
      <PageTitle
        imageSrc="/images/contactanos/contactanos_page.png"
        title="Contáctanos"
        subtitle="En este apartado podrás encontrar todos nuestros contactos"
      />
      {/* Contact card grid — one card per contact entry in data.js */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.title}
            title={contact.title}
            specialty={contact.specialty}
            contacts={contact.contacts}
          />
        ))}
      </section>
      {/* Submission form — client island handled by contact-form.jsx */}
      <ContactForm />
    </>
  );
}
