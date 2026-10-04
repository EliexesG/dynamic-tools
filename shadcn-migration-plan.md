# Plan: Migración a shadcn/ui (Tailwind v4)

> Basado en el reporte de adopción. Objetivo: modernizar los componentes reutilizados usando shadcn/ui sobre la migración existente a Tailwind v4, **manteniendo el esquema de colores de marca** (`#004651` primary, `#007a62` secondary) definido en `src/app/globals.css`.

## Contexto

- Tailwind v4 ya está instalado (`@tailwindcss/postcss`) y los componentes ya usan utilidades (`bg-primary`, `border-border`, `outline-ring`).
- `globals.css` ya define tokens semánticos con nombres compatibles con shadcn: `primary`, `secondary`, `surface`, `surface-muted`, `ink`, `ink-muted`, `border`, `input`, `ring`, `danger`.
- Alias `@/*` → `src/*` ya existe (`jsconfig.json`).
- `lucide-react` ya es dependencia (librería de iconos por defecto de shadcn).
- El proyecto usa JSX (no TypeScript): configurar `tsx: false`.
- Verificación en cada fase: `npm run lint` + `npm run build` (no existen tests).
- Rama de trabajo: `dev` (o `desarrollo`); PR hacia `master`.

## Componentes comunes repetidos (candidatos detectados)

| Patrón repetido | Archivos donde aparece | Componente shadcn |
|---|---|---|
| Botón estilizado a mano (7+ archivos) | tarjetaServicio, tarjetaMaquinaria, formularioContacto, galeriaImagenes/Videos, navbar, carrusel | `Button` (variantes: primary, secondary, outline-pill, ghost) |
| Receta de tarjeta `rounded-xl border border-border bg-surface p-5 shadow-sm` | tarjetaServicio, tarjetaMaquinaria, tarjetaInformacion, informacionPlana, formularioContacto | `Card` |
| Pill/badge `inline-flex rounded-full border px-3 py-1.5 text-small` | tarjetaServicio, tarjetaMaquinariaInicio | `Badge` |
| Inputs con `controlBase` + errores a mano | formularioContacto (4×) | `Input`, `Textarea`, `Label`, `Alert` |
| Acordeón / expandir-colapsar | tarjetaInformacion, informacionPlana | `Accordion` |
| Menú móvil gestionado a mano | navbar | `Sheet` (+ `NavigationMenu`) |
| Lightbox / pantalla completa a mano | galeriaImagenes, carrusel | `Dialog` |
| Carrusel propio (~250 líneas) | carrusel (usado por maquinaria y servicios) | `Carousel` — opcional, última fase |
| Banner de título repetido | tituloPagina, galeriaImagenes, tarjetaMaquinaria | `PageHero` (composición propia sobre `Card`) |

---

## Fase 0 — Fundaciones (inicialización)

**Objetivo:** `shadcn init` + mapeo de tokens de marca en `globals.css`.

1. Ejecutar `npx shadcn@latest init`.
2. Ajustar `components.json`:
   - `tsx: false` (proyecto JSX).
   - `tailwind.cssVariables: true` (default).
   - `aliases.ui: "@/app/components/ui"` (o `@/components/ui`, decidir y fijar).
3. En `globals.css`, **no** pegar el scaffold OKLCH por defecto. Solo añadir los aliases que falten apuntando a los tokens existentes:
   - `--color-background: var(--color-surface)`
   - `--color-foreground: var(--color-ink)`
   - `--color-muted: var(--color-surface-muted)`
   - `--color-muted-foreground: var(--color-ink-muted)`
   - `--color-destructive: var(--color-danger)`
   - `--color-accent: var(--color-accent-soft)`
   - Escala de radios: `--radius-sm/md/lg` derivadas del radius existente.
4. Añadir capa base shadcn:
   ```css
   @layer base {
     * { @apply border-border outline-ring/50; }
     body { @apply bg-background text-foreground; }
   }
   ```
5. Instalar deps compartidas que traerá el CLI (`class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*`).

**Verificación:** lint + build. Ninguna página cambia visualmente (solo se añade definiciones CSS).

---

## Fase 1 — Primitivos de alto impacto: Button y Badge

**Objetivo:** eliminar los estilos de botón/pill duplicados en 10+ archivos.

1. `npx shadcn@latest add button badge`.
2. Personalizar `button.jsx` con las variantes del proyecto:
   - `primary` (bg-primary, blanco), `secondary` (bg-secondary), `outline-pill` (la píldora `rounded-full border-primary/40`), `ghost` (para botones de lightbox/flechas).
3. Migrar llamadas (batch por archivo):
   - `button` pill → `tarjetaServicio.jsx`, `tarjetaMaquinariaInicio.jsx`
   - `secondary` → `formularioContacto.jsx` (submit), `tarjetaMaquinaria.jsx`
   - `ghost` → `galeriaImagenes.jsx`, `galeriaVideos.jsx`, `carrusel.jsx` (flechas/close)
4. Añadir `Badge` en las píldoras de chips de servicios/maquinaria.

**Verificación:** lint + build + revisión visual de servicios, maquinaria, galería y contacto en dev.

---

## Fase 2 — Card y composición de tarjetas

**Objetivo:** unificar la receta de tarjeta repetida en 5+ componentes.

1. `npx shadcn@latest add card`.
2. Extraer componentes compartidos en `src/app/components/`:
   - `PageHero` (sustituye al banner repetido; consumido por `tituloPagina.jsx`).
3. Migrar: `tarjetaServicio`, `tarjetaMaquinaria`, `tarjetaMaquinariaInicio`, `tarjetaInformacion`, `informacionPlana`, contenedor de `formularioContacto`.
4. Borrar CSS co-localizado residual de tarjetas ya migradas.

**Verificación:** lint + build + revisión visual de todas las páginas de listado.

---

## Fase 3 — Formulario de contacto

**Objetivo:** primitivos de formulario sin tocar la lógica Formik + yup.

1. `npx shadcn@latest add input textarea label alert`.
2. Sustituir `controlBase` string y las clases condicionales de error por los primitivos + `aria-invalid`.
3. Reemplazar `<p>` de error por `Alert` destructiva (o el patrón Field).
4. Mantener Formik/yup, ConvertirArchivosToAdjuntos, límites y sanitización de `src/lib/contacto.js` intactos (solo capa de presentación).

**Verificación:** lint + build + flujo completo del formulario en dev (recordar reiniciar dev server al quedarse sin rate limit 429).

---

## Fase 4 — Navegación y acordeones

**Objetivo:** menú y colapsables con a11y de Radix.

1. `npx shadcn@latest add sheet navigation-menu accordion`.
2. `navbar.jsx` → menú móvil en `Sheet`; eliminar `navbar.css` (el último archivo CSS co-localizado de la app shell).
3. `tarjetaInformacion.jsx` / `informacionPlana.jsx` → `Accordion`, eliminando el estado manual de expandir/colapsar.

**Verificación:** lint + build + navegación con teclado y móvil (revisar foco en Sheet).

---

## Fase 5 (opcional) — Carrusel y lightbox

**Objetivo:** reducir código mantenido; solo si se quiere desprender del carrusel propio.

1. `npx shadcn@latest add dialog carousel`.
2. Evaluar antes de migrar: el `carrusel.jsx` actual ya cumple el contrato WCAG (SOL-47/49/56): teclado, swipe, `aria-live`, sin autoplay, indicadores fuera de la imagen. La migración a `Carousel` (embla) debe **re-validar** cada requisito; si alguno se pierde, no migrar.
3. Migrar solo el lightbox (galería + pantalla completa del carrusel) a `Dialog` (reemplaza el manejo manual de `document.body.overflow` y Escape).

**Verificación:** lint + build + checklist de accesibilidad del carrusel (teclado ←/→/Home/End, swipe ≥ 50px, focus visible, counter `aria-live`).

---

## Riesgos y notas

- **Regresión visual:** cada fase termina con revisión visual; los tokens de marca no cambian de valor en ninguna fase.
- **CSS residual:** los `.css` co-localizados se eliminan solo al completar la migración del componente.
- **Bootstrap:** ya retirado del diff actual (`custom.scss` eliminado, `importBsJS.js` borrado); no re-introducirlo.
- **JSX:** los componentes generados por el CLI en TS deben convertirse a JSX (quitar tipos) o usar el flag/config `tsx: false` desde el inicio.
- **`public/`:** no añadir assets pesados; todo lo nuevo es código CSS/JS.
- **Carrusel:** es el de mayor riesgo; su lógica propia está probada y accesible — decidir migración por separado.
