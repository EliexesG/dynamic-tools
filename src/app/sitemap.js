const baseURL = process.env.URL_BASE;

// Bump when copy/content changes; keeps crawlers from re-indexing on every
// build the way a fresh `new Date()` per entry would.
const LAST_UPDATED = new Date("2026-10-09");

// Static routes only — single-page sections (services/machines live inside
// their own pages), so no per-item entries are needed at this scale.
const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/contactanos", priority: 0.8 },
  { path: "/galeria", priority: 0.8 },
  { path: "/maquinaria", priority: 0.9 },
  { path: "/nosotros", priority: 0.8 },
  { path: "/servicios", priority: 0.9 },
];

export default function sitemap() {
  return STATIC_ROUTES.map(({ path, priority }) => ({
    url: path ? `${baseURL}${path}` : baseURL,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority,
  }));
}
