import Link from "next/link";

import { Button } from "@/app/components/ui/button";

// Page-not-found metadata — intentionally NOT built with `pageMetadata`:
// a 404 route has no canonical URL to declare, so `alternates` is omitted,
// and it must never be indexed.
export const metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Vuelve al inicio de A&M Dynamic Tools S.A.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Custom 404 page: big status numeral, explanatory text and a return CTA.
 * Server component; no client islands.
 *
 * @param {Object} props Component props. This component takes no props.
 * @returns {JSX.Element} The 404 content.
 */
export default function NotFound() {
  return (
    <div className="py-16 text-center">
      {/* Status numeral — oversized display value, page-specific by design */}
      <p className="mb-0 text-7xl leading-none font-bold text-primary">404</p>
      <h1 className="mb-3 font-bold">Página no encontrada</h1>
      <p className="mb-4">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      {/* Return CTA */}
      <Button asChild variant="secondary" className="hover:bg-primary">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
