# AGENTS.md

Corporate site for A&M Dynamic Tools S.A. — Next.js 15 (App Router) + React 19, Tailwind CSS v4 + shadcn/ui (Bootstrap fully removed), single package. All UI content is in Spanish (`lang="es"`); code (identifiers, files, comments) is in English and only user-visible text stays Spanish.

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
- **All site content (services, machinery, gallery, contacts) lives in `src/lib/data.js`.** Add/edit site data there, not in pages. Site navigation entries (navbar/footer links + icons + visibility flags) live in `src/lib/site-navigation.js` — single source of truth; do not copy them into shell components.
- Path alias `@/*` → `src/*` (`jsconfig.json`).
- Styling: Tailwind CSS v4 (`@tailwindcss/postcss`). **All brand colors and design tokens are defined in `src/app/globals.css`** (primary `#004651`, secondary `#007a62`) and referenced as utilities (`bg-primary`, `text-ink`, `outline-ring`) — never hardcode brand hex values. shadcn semantic aliases (`bg-background`, `bg-card`, `bg-muted`, `text-muted-foreground`, `bg-destructive`…) map onto the brand tokens in a bottom `@theme inline` block so shadcn components inherit the brand palette with zero drift.
- Bootstrap is gone: no `custom.scss`, no `ImportBsJS`, no Bootstrap classes. Do not re-introduce any of them.
- shadcn/ui primitives live in `src/app/components/ui/` (button, badge, card, input, textarea, label, select, alert, sheet, dialog, accordion, carousel) generated via `npx shadcn@latest add ...` (`components.json` sets `tsx: false`, `cssVariables: true`). Generated JSX may be customized in place (e.g. `button.jsx` variants: `secondary`, `outline-pill`, `outline-light`, `lightbox`), but keep files CLI-shaped (`cn`, `cva`) so future `shadcn add` merges stay compatible.
- Feature/one-off components go in `src/app/components/` (app shell: `image.jsx`, `navbar.jsx`, `footer.jsx`, `quick-bar.jsx`, `title-banner.jsx`, `gallery-carousel.jsx`) or co-located `components/` folders per page/feature. Don't put domain components in `ui/` — that folder is for CLI-generated primitives only.
- Images use the shared wrapper `src/app/components/image.jsx` (next/image with blur placeholder), not raw `next/image`.

## Component conventions (shadcn migration, 2026)

- **Two-layer pyramid:** CLI-generated primitives live in `src/app/components/ui/` and stay generic/dumb (no brand state, no page knowledge). Domain components in `src/app/components/` (or `components/` inside a route) compose primitives and own the brand styling, a11y contract and page-level behavior (e.g. `gallery-carousel.jsx` wraps `ui/carousel.jsx`, adds dots, `aria-live` counter, Home/End keys and a fullscreen Radix Dialog). Pages use the domain layer, never the `ui/` primitives directly for composed use cases.
- **Naming:** code is English — identifiers, props, comments, file names in kebab-case (`gallery-carousel.jsx`, `quick-bar.jsx`). Only strings the user sees (labels, `alt`s, `aria-label`s, toasts) stay in Spanish, per `lang="es"`.
- **File naming pattern — `{feature}_{purpose}.jsx`:** per-feature components carry the feature module first, then the purpose, both kebab-case: `gallery-images.jsx`, `gallery-videos.jsx`, `gallery-carousel.jsx` (galería), `contact-form.jsx`, `contact-card.jsx` (contactanos). Shared app-shell components in `src/app/components/` have no prefix (they belong to no feature): `navbar.jsx`, `footer.jsx`, `image.jsx`, `quick-bar.jsx`, `title-banner.jsx`, `contact-actions.jsx`. Don't mix the orders (`videos-gallery.jsx` style is wrong).
- **JSDoc on every exported component and helper:** purpose, `@param` (with defaults and types), `@returns`. Declare which a11y/behavior concerns are native (embla, Radix) and which the component adds. Keep comments free of AI-agent/session/process chatter — no ticket-streaming narration, no "as requested" wording; only durable engineering context (design contract, accepted trade-offs, gotchas).
- **Signpost JSX:** multi-section components carry short `{/* Section — why it exists */}` comments naming each Markup region (stage, arrows, indicators, live region, modal wrapper) so sections are navigable at a glance.
- **Ownership plan:** adopted design tokens must come from `globals.css` — when adding shadcn components, extend the `@theme inline` alias block instead of adding new hex values.
- **Reusable-pattern rule:** when a styled button/badge/card/heading recipe is pasted a second time, extract it — either as a variant on the corresponding `ui/` primitive (shadcn pattern: `cva` variants) or a small domain component — instead of duplicating class strings.

## Contact form pipeline

Form (Formik + yup, `contact-form.jsx`) → attachments base64-encoded client-side (`ConvertirArchivosToAdjuntos` in `src/lib/utils.js`) → `POST /api/contacto` (`src/app/api/contacto/route.js`) → validation/sanitization in `src/lib/contacto.js` → two Nodemailer emails (corporate copy + client auto-reply). The POST payload keys (`asunto`, `cuerpo.correo`, `cuerpo.peticion`, `cuerpo.tipo`, `cuerpo.fecha`, `adjuntos`) are the API contract with `src/lib/contacto.js` — never rename them as a pure UI refactor.

- Rate limit: 5 requests / 10 min per IP via an **in-memory** Map (clears on dev-server restart). When testing the endpoint repeatedly, restart `npm run dev` after hitting 429.
- Attachment limits (max 10 files, 5 MB each, allowed extensions/signatures) are constants in `src/lib/contacto.js`.

## Workflow

- `public/` is production-served "no parking": only optimized design assets (site images, favicons, fonts). Never commit >5 MB binaries, dev-only files, or unused assets — each file ships to every visitor and deploy (see README).
- Default branch is `master`; feature work flows through `desarrollo`/`dev` branches and is merged via PR. Current work may be on `dev`, ahead — check branch/status before assuming `master` state.
