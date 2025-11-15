import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

const baseURL = process.env.URL_BASE;

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

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Toast */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* Navbar */}
        <Navbar className="w-full" />

        {/* Content */}
        <div className="mt-[120px] flex flex-col items-center w-full ps-4 pe-4">
          <main>{children}</main>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
