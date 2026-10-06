# A&M Dynamic Tools S.A. — Corporate website

Corporate site for **A&M Dynamic Tools S.A.**, a precision mechanical
engineering workshop. Built with [Next.js](https://nextjs.org/) 15 (App
Router) and React 19, styled with Tailwind CSS v4 and
[shadcn/ui](https://ui.shadcn.com/) primitives.

All user-facing content is in Spanish (`lang="es"`); code (identifiers,
files, comments) and repository docs are in English. Route folder names
(`/nosotros`, `/galeria`, …) stay Spanish — they are user-facing URLs.

## Prerequisites

- Node.js 18.18 or higher
- npm (included with Node.js)

## Installation

```bash
npm install
```

## Environment variables

Copy the template and fill in the real values. **Never** commit secrets to
the repository.

```bash
cp .env.example .env.local
```

| Variable | Required | Usage |
| --- | --- | --- |
| `URL_BASE` | Yes | Base URL of the site. Used by `src/app/layout.jsx` (`metadataBase`), `src/app/sitemap.js` and `src/app/robots.js`. Without it the app crashes at boot/build with `Invalid URL`. Example: `https://dynamictoolscr.com` (locally: `http://localhost:3000`). |
| `GOOGLE_VERIFICATION` | No | Google Search Console verification token (`metadata.verification` in `src/app/layout.jsx`). |
| `SMTP_USER`, `SMTP_PASS`, `SMTP_SERVICE` | No | Nodemailer SMTP credentials used by the contact form (`src/app/api/contacto/_lib/contact-mailer.js`). Without them the form cannot send email. `SMTP_SERVICE` defaults to `gmail`. The legacy `USER`/`PASS` names were renamed because they collide with the POSIX shell variable. |
| `CONTACT_RECIPIENT_EMAIL`, `CONTACT_CC_EMAIL`, `CONTACT_FROM_EMAIL` | No | Placeholders only — the contact addresses are currently hardcoded in `src/app/api/contacto/_lib/contact-mailer.js`, so changing these variables has no effect yet. |

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser. The page
reloads automatically when files are edited.

## Build and production

```bash
npm run build
npm run start
```

There are no tests and no CI in this repository: verification is
`npm run lint` + `npm run build`.

## Project structure

```
src/
├─ app/                 # App Router routes and the app shell
│  ├─ layout.jsx        # Root layout: metadata, Navbar, Footer, Toaster
│  ├─ page.jsx          # Home (route "/"; nav label "Inicio")
│  ├─ globals.css       # Tailwind v4 theme: brand tokens + shadcn aliases
│  ├─ nosotros/         # Nosotros
│  ├─ servicios/        # Servicios
│  ├─ maquinaria/       # Maquinaria
│  ├─ galeria/          # Gallery: images and videos
│  ├─ contactanos/      # Contact page + form
│  │  ├─ components/    # contact-form.jsx, contact-card.jsx
│  │  └─ _lib/          # contact-api.js, contact-attachments.js
│  ├─ components/       # Shared app-shell and domain components
│  │  └─ ui/            # CLI-generated shadcn/ui primitives only
│  ├─ api/
│  │  ├─ _lib/          # Shared BE utilities: rate-limit.js, response.js
│  │  └─ contacto/      # POST Route Handler for the contact form
│  │     └─ _lib/       # BE service layer: dto, attachment validation,
│  │                    #   sanitization, mailer (transport + templates)
│  ├─ not-found.jsx     # Custom 404
│  ├─ robots.js         # robots.txt
│  └─ sitemap.js        # sitemap.xml
└─ lib/                 # Cross-feature frontend libs
   ├─ cn.js             # Class composer
   ├─ data.js           # Entity data: services, machines, contacts…
   ├─ page-metadata.js  # Shared metadata helper
   ├─ primary-contact.js
   └─ site-navigation.js
```

`_lib/` folders are Next.js
[private folders](https://nextjs.org/docs/app/building-your-application/routing/private-folders):
their modules are implementation details of the feature next to them and
must only be imported from within that feature.

## `public/` — NO PARKING

`public/` holds assets served in production (site images, favicons, fonts)
that are part of the design. **Never** commit large binaries here
(design fonts, installers, videos, PSDs, images over 5 MB). Everything in
`public/` is shipped to every visitor and travels in every deployment.

- If a file is development-only, documentation or internal exchange: keep it
  out of the repository.
- Optimize images before uploading them (each one is downloaded on every page
  load).
- If it is not used at runtime, do not put it in `public/`.
