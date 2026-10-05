import "./globals.css";

import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import QuickBar from "./components/quick-bar";

// Required env: without `URL_BASE` this module crashes at boot/build with
// `Invalid URL` (metadataBase needs an absolute origin). Local value:
// `http://localhost:3000` (see `.env.example`).
const baseURL = process.env.URL_BASE;
const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "A&M Dynamic Tools S.A.",
    template: "%s | A&M Dynamic Tools S.A.",
  },
  description:
    "Somos una empresa encargada de un taller de precisión que da soporte de ingeniería a clientes en los campos de diseño mecánico, metalmecánica, mecanizado, etc",
  icons: {
    icon: ["/images/favicons/favicon.ico?v=4"],
    apple: ["/images/favicons/apple-touch.icon.png?v=4"],
    shortcut: ["/images/favicons/apple-touch-icon.png"],
    manifest: "/images/favicons/site.webmanifest",
  },
  metadataBase: new URL(baseURL),
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

/**
 * Root layout: fixed navbar, main content rail, global footer and the
 * mobile quick-bar, all composed over the brand shell tokens. Server
 * component — no client islands at the layout level.
 *
 * Neither `main` nor `children` may scroll-lock manually: nested Radix
 * primitives (Dialog/Sheet islands) own the document scroll while open.
 *
 * @param {Object} props          Layout props.
 * @param {React.ReactNode} props.children Route content rendered inside `main`.
 * @returns {JSX.Element} The full application shell around the page content.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={font.style}>
        {/* Toast viewport — mounted once, used by every client island */}
        <Toaster position="top-center" reverseOrder={false} />
        {/* Fixed navbar */}
        <Navbar />
        {/* Main content rail — `pt-navbar` clears the fixed navbar, mobile
            quick-bar spacing is owned by the QuickBar spacer itself */}
        <div className="pt-navbar pb-section-sm">
          <main className="mx-auto w-full max-w-content px-gutter py-6">
            {children}
          </main>
        </div>
        {/* Global footer + mobile-only quick contact bar */}
        <Footer />
        <QuickBar />
      </body>
    </html>
  );
}
