import {
  House,
  HeartHandshake,
  Wrench,
  Users,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";

/**
 * Site navigation entries.
 *
 * @typedef {Object} SiteLink
 * @property {string} href Route path.
 * @property {string} label Link text (always Spanish, user-facing).
 * @property {import("lucide-react").LucideIcon} icon Leading icon for the link.
 * @property {boolean} [ariaCurrentPage] Marks the entry as the current page for its own `href` (home only, static).
 * @property {boolean} [inNavbar] Omit (`false`) to hide the entry from the navbar.
 * @property {boolean} [inFooter] Omit (`false`) to hide the entry from the footer.
 */

/**
 * Single source of truth for the site navigation, consumed by the navbar
 * and the footer (usually via the filtered `navbarLinks` / `footerLinks`).
 * Add or reorder routes here — do not keep a local copy in the shell
 * components.
 *
 * @type {SiteLink[]}
 */
export const siteLinks = [
  { href: "/", label: "Inicio", icon: House, ariaCurrentPage: true },
  { href: "/servicios", label: "Servicios", icon: HeartHandshake },
  { href: "/maquinaria", label: "Maquinaria", icon: Wrench },
  { href: "/galeria", label: "Galería", icon: ImageIcon, inFooter: false },
  { href: "/nosotros", label: "Nosotros", icon: Users },
  { href: "/contactanos", label: "Contáctanos", icon: MessageCircle },
];

/** Entries rendered by the navbar. @type {SiteLink[]} */
export const navbarLinks = siteLinks.filter((link) => link.inNavbar !== false);

/** Entries rendered by the footer. @type {SiteLink[]} */
export const footerLinks = siteLinks.filter((link) => link.inFooter !== false);
