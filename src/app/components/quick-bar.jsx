import { Phone, MessageCircleMore } from "lucide-react";

import { primaryContact } from "@/lib/primary-contact";

import ContactAction from "@/app/components/contact-actions";

/**
 * Fixed mobile-only quick contact bar (call / WhatsApp), mounted from
 * layout.jsx on every page. Full-width buttons on the primary teal surface
 * keep white visible text (secondary / outline-light variants). A spacer
 * below reserves the bar height (+ safe area) so content is never covered.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The bar plus its safe-area spacer.
 */
export default function QuickBar() {
  return (
    <>
      {/* Quick actions bar — fixed bottom, visible below the lg breakpoint */}
      <div
        role="region"
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-secondary bg-primary px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] lg:hidden"
        aria-label="Acciones de contacto rápido"
      >
        <ContactAction
          className="flex-1"
          href={primaryContact.telephoneHref}
          size="lg"
          aria-label={`Llamar al ${primaryContact.telephone}`}
        >
          <Phone aria-hidden="true" className="size-5" /> Llamar
        </ContactAction>
        <ContactAction
          className="flex-1"
          size="lg"
          whatsapp
          href={primaryContact.whatsappHref}
          aria-label="Escribir por WhatsApp"
        >
          <MessageCircleMore aria-hidden="true" className="size-5" /> WhatsApp
        </ContactAction>
      </div>
      {/* Safe-area spacer — reserves the bar height so page content is not covered */}
      <div
        className="h-[calc(var(--spacing-quickbar)+env(safe-area-inset-bottom,0px))] lg:hidden"
        aria-hidden="true"
      />
    </>
  );
}
