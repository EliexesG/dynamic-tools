# A&M Dynamic Tools S.A. — Sitio web

Sitio corporativo de **A&M Dynamic Tools S.A.**, un taller de ingeniería
mecánica en precisión. Construido con [Next.js](https://nextjs.org/) 15 (App
Router) y React 19, con estilos basados en Bootstrap 5 y Sass.

## Requisitos previos

- Node.js 18.18 o superior
- npm (incluido con Node.js)

## Instalación

```bash
npm install
```

## Variables de entorno

Copia la plantilla y completa los valores reales. **Nunca** subas secretos al
repositorio.

```bash
cp .env.example .env.local
```

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `URL_BASE` | Sí | URL base del sitio. La usan `src/app/layout.jsx` (`metadataBase`), `src/app/sitemap.js` y `src/app/robots.js`. Sin ella la app falla al arrancar/compilar con `Invalid URL`. Ejemplo: `https://dynamictoolscr.com` (en local: `http://localhost:3000`). |
| `GOOGLE_VERIFICATION` | No | Token de verificación de Google Search Console (`metadata.verification`). |
| `SMTP_USER`, `SMTP_PASS`, `SMTP_SERVICE` | No | Credenciales SMTP de Nodemailer usadas por el formulario de contacto (`src/config/nodemailer.js` y `src/app/api/contacto/route.js`). Si no se configuran, el formulario no podrá enviar correos. `SMTP_SERVICE` es `gmail` por defecto. |
| `CONTACT_RECIPIENT_EMAIL`, `CONTACT_CC_EMAIL`, `CONTACT_FROM_EMAIL` | No | Direcciones usadas por el correo de contacto (por ahora definidas en `src/config/nodemailer.js`). |

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. La página se
recarga automáticamente al editar los archivos.

## Compilación y producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
src/
├─ app/                 # Rutas del App Router
│  ├─ layout.jsx        # Layout raíz: metadatos, Navbar, Footer, Toaster
│  ├─ page.jsx          # Inicio
│  ├─ nosotros/         # Nosotros
│  ├─ servicios/        # Servicios
│  ├─ maquinaria/       # Maquinaria
│  ├─ galeria/          # Galería de imágenes y videos
│  ├─ contactanos/      # Contacto + formulario
│  ├─ not-found.jsx     # Página 404 personalizada
│  ├─ api/contacto/     # Route Handler POST del formulario
│  ├─ robots.js         # robots.txt
│  └─ sitemap.js        # sitemap.xml
├─ components/          # Navbar, Footer, BarraContacto, etc.
├─ config/              # Configuración de Nodemailer
└─ lib/                 # Datos del sitio, helpers de API y validación
```

## `public/` — NO PARKING

`public/` es para assets que se sirven en producción (imágenes del sitio,
favicons, fuentes) y son parte del diseño. **Nunca** subas binarios grandes aquí
(fuentes de diseño, instaladores, videos, PSDs, imágenes de más de 5 MB).
Todo lo que se coloca en `public/` se sirve a cada visitante y viaja en cada
despliegue.

- Si un archivo es solo para desarrollo, documentación o intercambio interno: mantenlo fuera del repositorio.
- Optimiza las imágenes antes de subirlas (se envían en cada carga de página).
- Si no se usa en tiempo de ejecución, no lo pongas en `public/`.
