/**
 * Shared page metadata helper — builds the common Next.js metadata shape
 * (title, Spanish description, canonical path) so every page applies the
 * same structure and none forgets `alternates.canonical`.
 *
 * When a page passes its hero `image`, the helper also builds Open Graph
 * and Twitter link-sharing metadata (absolute URLs from `URL_BASE`); the
 * layout metadata carries the fallback for pages without an image.
 *
 * Title/description stay Spanish (site language contract); the layout
 * metadata already appends the brand template ("%s | A&M Dynamic Tools S.A.").
 *
 * @param {Object}  params             Helper params.
 * @param {string}  [params.title]     Page title; omit on the home route (layout provides the default).
 * @param {string}  params.description Spanish meta description (reused as the OG/Twitter description).
 * @param {string}  params.path        Canonical route path (e.g. "/servicios", "/" for home).
 * @param {string}  [params.image]     Public image path (usually the page hero) for OG/Twitter sharing.
 * @returns {Object} Next.js `metadata` export value for `export const metadata = pageMetadata(...)` calls.
 */
export function pageMetadata({ title, description, path, image }) {
  const baseURL = process.env.URL_BASE;
  const resolvedTitle = title ?? "A&M Dynamic Tools S.A.";

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: path ? `${baseURL}${path}` : baseURL,
      siteName: "A&M Dynamic Tools S.A.",
      locale: "es_CR",
      type: "website",
      ...(image ? { images: [{ url: `${baseURL}${image}` }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
    },
  };
}
