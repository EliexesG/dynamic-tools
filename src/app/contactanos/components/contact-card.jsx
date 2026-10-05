import { Phone, Mail } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";

/**
 * Contact card for one person/department: teal header band (name +
 * optional specialty) and a bordered body listing phone/email links.
 * Built from `ui/` card parts; the band keeps white text on a colored
 * background per the design contract, and body links use brand tokens.
 *
 * Link protocol is derived from `contact.type` (contains "Cel" → `tel:`,
 * otherwise `mailto:`) — do not inline this logic in pages.
 *
 * @param {Object}  props           Component props.
 * @param {string}  props.title     Person/department name (Spanish).
 * @param {string}  [props.specialty] Specialty line; hidden when "N/A".
 * @param {Array}   props.contacts  Contact entries: `{ tipo, detalle }` (data-shape contract from `src/lib/data.js`).
 * @returns {JSX.Element} The contact card.
 */
export default function ContactCard({ title, specialty, contacts }) {
  return (
    <Card className="h-full gap-0 border-0 overflow-hidden shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03] motion-reduce:hover:scale-100">
      {/* Teal header band — white heading text over the primary color */}
      <CardHeader className="bg-primary px-4 py-3 gap-0">
        <CardTitle
          asChild
          className="text-center text-2xl text-white font-bold"
        >
          <h2>{title}</h2>
        </CardTitle>
        {specialty !== "N/A" && (
          <CardDescription
            asChild
            className="text-center text-xl text-white font-bold"
          >
            <h3>{specialty}</h3>
          </CardDescription>
        )}
      </CardHeader>
      {/* Contact entries — phone/email links with brand token colors */}
      <CardContent className="flex-1 flex flex-col gap-2 px-4 py-4">
        {contacts.map((contact, index) => (
          <p className="text-foreground" key={index}>
            <a
              className="inline-flex items-center gap-2 rounded-md no-underline transition-colors hover:text-ink-muted"
              href={
                contact.type.includes("Cel")
                  ? `tel:+506${contact.detail.replace(" ", "")}`
                  : `mailto:${contact.detail}`
              }
            >
              {contact.type.includes("Cel") ? (
                <Phone aria-hidden="true" className="size-5" />
              ) : (
                <Mail aria-hidden="true" className="size-5" />
              )}{" "}
              {`${contact.type}: ${contact.detail}`}
            </a>
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
