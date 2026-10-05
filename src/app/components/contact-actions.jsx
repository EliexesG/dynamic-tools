import { Button } from "@/app/components/ui/button";

/**
 * Reusable contact action: an anchor rendered as a brand `Button`.
 * Shared by `navbar.jsx` (desktop row + mobile Sheet) and `quick-bar.jsx`
 * (fixed bottom bar); used twice → extracted per the reusable-pattern rule.
 *
 * Variants: `secondary` (CTA "Llamar") and `outline-light` (WhatsApp link on
 * dark teal surfaces). Both variants keep white visible text on their
 * colored backgrounds per the design contract.
 *
 * @param {Object}  props          Component props.
 * @param {string}  props.href     Destination URL (tel: or wa.me link).
 * @param {boolean} [props.whatsapp] When true, adds target/rel for the external link and uses the outline-light variant.
 * @param {React.ReactNode} props.children Button content (icon, optional label).
 * @param {any} props.rest   Extra props forwarded to `Button`.
 * @returns {JSX.Element} The rendered button.
 */
export default function ContactAction({ href, whatsapp, children, ...rest }) {
  return (
    <Button
      asChild
      variant={whatsapp ? "outline-light" : "secondary"}
      size="sm"
      {...rest}
    >
      <a
        href={href}
        {...(whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </Button>
  );
}
