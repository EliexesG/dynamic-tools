# AGENTS.md

Corporate site for A&M Dynamic Tools S.A. — Next.js 15 (App Router) + React 19, Bootstrap 5 + Sass, single package. All UI content is in Spanish (`lang="es"`); component/file names are Spanish too (e.g. `tarjetaServicio.jsx`).

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` + `npm run start` — production
- `npm run lint` — ESLint (`next/core-web-vitals` config)
- No tests and no CI exist in the repo. Verification = `npm run lint` + `npm run build` (there are no test files).

## Environment (gotchas)

- Copy `.env.example` → `.env.local`. Requires Node 18.18+.
- `URL_BASE` is **required**: without it the app crashes at boot/build with `Invalid URL` (used by `src/app/layout.jsx` `metadataBase`, `src/app/sitemap.js`, `src/app/robots.js`). Local value: `http://localhost:3000`.
- `SMTP_USER` / `SMTP_PASS` / `SMTP_SERVICE` (default `gmail`) are needed only for the contact form to send. Legacy names `USER`/`PASS` were renamed because they collide with the POSIX shell var.
- Contact recipient/CC/from addresses are **hardcoded in `src/config/nodemailer.js`** (not `mailOptions*` env). The `CONTACT_*` vars in `.env.example` are placeholders — changing env has no effect yet.

## Architecture

- Pages under `src/app`: inicio, nosotros, servicios, maquinaria, galeria, contactanos; plus `api/contacto/`, `robots.js`, `sitemap.js`, custom 404.
- **All site content (services, machinery, gallery, contacts) lives in `src/lib/data.js`.** Add/edit site data there, not in pages.
- Path alias `@/*` → `src/*` (`jsconfig.json`).
- Styling: Bootstrap theme colors are overridden in `src/app/custom.scss` (primary `#004651`), imported once by layout. All other styles are plain `.css` files co-located next to each component; Sass is only used for `custom.scss`.
- Bootstrap JS is loaded client-side via `<ImportBsJS />` in `layout.jsx` — don't import it directly elsewhere.
- Images use the shared wrapper `src/app/components/Imagen.jsx` (next/image with blur placeholder), not raw `next/image`.

## Contact form pipeline

Form (Formik + yup, `formularioContacto.jsx`) → attachments base64-encoded client-side (`ConvertirArchivosToAdjuntos` in `src/lib/utils.js`) → `POST /api/contacto` (`src/app/api/contacto/route.js`) → validation/sanitization in `src/lib/contacto.js` → two Nodemailer emails (corporate copy + client auto-reply).

- Rate limit: 5 requests / 10 min per IP via an **in-memory** Map (clears on dev-server restart). When testing the endpoint repeatedly, restart `npm run dev` after hitting 429.
- Attachment limits (max 10 files, 5 MB each, allowed extensions/signatures) are constants in `src/lib/contacto.js`.

## Workflow

- `public/` is production-served "no parking": only optimized design assets (site images, favicons, fonts). Never commit >5 MB binaries, dev-only files, or unused assets — each file ships to every visitor and deploy (see README).
- Default branch is `master`; feature work flows through `desarrollo`/`dev` branches and is merged via PR. Current work may be on `dev`, ahead — check branch/status before assuming `master` state.
