/**
 * Shared page metadata helper — builds the common Next.js metadata shape
 * (title, Spanish description, canonical path) so every page applies the
 * same structure and none forgets `alternates.canonical`.
 *
 * Title/description stay Spanish (site language contract); the layout
 * metadata already appends the brand template ("%s | A&M Dynamic Tools S.A.").
 *
 * @param {Object}  params            Helper params.
 * @param {string}  [params.title]    Page title; omit on the home route (layout provides the default).
 * @param {string}  params.description Spanish meta description.
 * @param {string}  params.path       Canonical route path (e.g. "/servicios", "/" for home).
 * @returns {Object} New.js `metadata` export value for `export const metadata = pageMetadata(...)` calls.
 */
export function pageMetadata({ title, description, path }) {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
    },
  };
}
