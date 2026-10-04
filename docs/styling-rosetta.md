# Styling Rosetta — Bootstrap 5 → Tailwind v4

Reference mapping for the Bootstrap→Tailwind restyling of **A&M Dynamic Tools S.A.**
Source of truth for the class sweep tasks (Rosetta + layout shell, pages/cards, contact/gallery,
navbar, carousels). It is a *conversion contract*, not a suggestion: convert by the rule here, and
flag anything not covered before improvising.

Related: [SOL-47 plan](https://paperclip.local/SOL/issues/SOL-47) · token sheet (SOL-50) · Foundation (SOL-51).

## 0. Ground rules

1. **Breakpoints = Tailwind v4 defaults** (board ruling, SOL-47 rev 3). Do **not** keep Bootstrap numbers.
2. **No hex in components.** Colors come from the frozen token contract in `globals.css` (`@theme`),
   defined from Iris's token sheet (SOL-50): `--color-primary` `#004651`, `--color-secondary` `#007a62`,
   plus `--color-accent`, muted/border/ring and their `--*-foreground` pairs.
3. **This table is mechanical for utilities; components are not.** `btn`, `card*`, `navbar*`, `carousel*`,
   `form-control/label/select` are *structured* Bootstrap components rebuilt in their own tasks — never
   blind-replaced by a utility string.
4. **Work uncommitted** this cycle (board reviews the working tree). Verify with `npm run lint` +
   `npm run build` (repo has no tests).
5. If a mapping is marked **⚖ per-usage**, stop and look at the rendered result; do not batch-convert.

---

## 1. Breakpoints

Co-located CSS `@media` queries, `<Imagen sizes>` strings, and responsive class prefixes must all move to
the Tailwind scale.

| Bootstrap | px | Tailwind prefix | px |
|---|---|---|---|
| `*-sm-*` (≥576) | 576 | `sm:` | 640 |
| `*-md-*` (≥768) | 768 | `md:` | 768 |
| `*-lg-*` (≥992) | 992 | `lg:` | 1024 |
| `*-xl-*` (≥1200) | 1200 | `xl:` | 1280 |
| `*-xxl-*` (≥1400) | 1400 | `2xl:` | 1536 |

- Mobile-first in both; the *content* of a query moves with the number (e.g. `@media (max-width: 991.98px)`
  → `@media (max-width: 1023.98px)`, or better a `max-lg:` Tailwind variant).
- `<Imagen sizes="…">`: replace Bootstrap cut numbers with `640px / 768px / 1024px / 1280px / 1536px`.
- Layout must be re-verified at each new cut — breakpoint remap is a known silent-regression risk.

## 2. Spacing — the non-obvious one

Bootstrap `$spacer = 1rem` with a *denominated* scale; Tailwind uses `--spacing = 0.25rem` with a
**numeric multiplier**. They agree only at 0–2. **`p-3` is NOT `p-3`.**

| Bootstrap | rem | Tailwind | rem |
|---|---|---|---|
| `*-0` | 0 | `*-0` | 0 |
| `*-1` | 0.25 | `*-1` | 0.25 |
| `*-2` | 0.5 | `*-2` | 0.5 |
| `*-3` | 1.0 | `*-4` | 1.0 |
| `*-4` | 1.5 | `*-6` | 1.5 |
| `*-5` | 3.0 | `*-12` | 3.0 |

- Also expressible as fractions/multiples: `*-8` = 2rem, `*-10` = 2.5rem, `*-14` = 3.5rem, `*-16` = 4rem.
- Applies to every spacing property: `m`/`p`, `mt/mb/ms/me/mx/my`, `pt/pb/ps/pe/px/py`, `gap`, `g`/`gy`.
- Logical margins: Bootstrap `ms-*`/`me-*` → Tailwind `ms-*`/`me-*` (v4 keeps logical naming).
- Gutter classes `g-*`/`gy-*`/`gx-*` → `gap-*` / `gap-y-*` / `gap-x-*` on the grid/flex parent.
- **⚖ per-usage:** spacing rhythm is being *re-tuned* to one vertical token (section gap ≈3.5–4rem desktop /
  2.25–2.5rem mobile). Do not preserve a divergent value just because it maps; snap section-level spacing
  to the rhythm token from the sheet.

## 3. Display / flex / grid

| Bootstrap | Tailwind |
|---|---|
| `d-block` / `d-inline` / `d-inline-block` / `d-flex` / `d-grid` / `d-none` | `block` / `inline` / `inline-block` / `flex` / `grid` / `hidden` |
| `d-lg-none` | `lg:hidden` |
| `d-lg-flex` | `lg:flex` |
| `d-none d-lg-flex` | `hidden lg:flex` |
| `flex-column` / `flex-row` | `flex-col` / `flex-row` |
| `flex-fill` | `flex-1` |
| `justify-content-center` / `-between` / `-start` / `-end` / `-around` | `justify-center` / `justify-between` / `justify-start` / `justify-end` / `justify-around` |
| `align-items-center` / `-start` / `-end` | `items-center` / `items-start` / `items-end` |
| `row` (+ `col*`) | `grid grid-cols-12` (+ `col-span-*`), or `flex flex-wrap` where columns were flex items |
| `col` (auto) | `flex-1 basis-0` (flex) / `col-span-*` (grid) ⚖ |
| `col-md-2` | `md:col-span-2` (grid) or `md:basis-1/6` (flex) ⚖ |
| `col-md-4` / `col-md-6` / `col-md-12` / `col-lg-8` | `md:col-span-4` / `md:col-span-6` / `col-span-12` / `lg:col-span-8` ⚖ |
| `row-cols-1 row-cols-sm-2 row-cols-md-3` | `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3` |

**⚖ Row→grid decision:** Bootstrap `.row` is a flex container with negative margins + padded columns.
Tailwind `grid` is cleaner for equal-track layouts (cards, footer nav, maquinaria). Where a row relied on
`justify-content-center` to center a fixed number of flex columns (e.g. footer `col-md-2` ×5), keep it as
`flex flex-wrap justify-center` with `basis-*` so the centering behavior is preserved.

## 4. Color, surface & text

| Bootstrap | Tailwind (brand tokens) |
|---|---|
| `bg-primary` | `bg-primary` (→ `--color-primary` `#004651`) |
| `bg-secondary` | `bg-secondary` (→ `--color-secondary` `#007a62`) |
| `bg-light` / `bg-dark` / `bg-black` / `bg-white` | `bg-light` / `bg-dark` / `bg-black` / `bg-white` (mapped to sheet tokens, not raw) |
| `bg-transparent` | `bg-transparent` |
| `bg-gradient` | **Not 1:1.** Bootstrap = subtle white top overlay; Tailwind = real gradient. Use `bg-linear-to-b` + brand stops from the sheet, or drop it. ⚖ |
| `text-primary` / `text-secondary` / `text-white` / `text-black` | `text-primary` / `text-secondary` / `text-white` / `text-black` |
| `text-white-50` | `text-white/50` |
| `text-danger` | `text-danger` (→ `--color-destructive` / `--color-danger`) |
| `border-primary` / `border-secondary` | `border-primary` / `border-secondary` |

- **`text-white-50` fails contrast** (≈ `rgba(255,255,255,.5)` on `#004651`). Acceptance requires ≥4.5:1 for
  all text. Replace with a brand-legal value from the sheet (footer/navbar are explicitly in QA scope), not
  a literal `/50`.
- shadcn semantic tokens (`--primary`, `--secondary`, `--muted`, `--accent`, `--ring`, `--border`) are
  mapped **deliberately** to brand values with correct `--*-foreground`; never collapse `#007a62` into
  shadcn's neutral `--secondary`.

## 5. Borders, radius & shadow

| Bootstrap | Tailwind |
|---|---|
| `border` / `border-0` / `border-1` | `border` / `border-0` / `border` |
| `border-top` / `border-bottom` / `border-start` / `border-end` | `border-t` / `border-b` / `border-s` / `border-e` |
| `rounded` (.375rem) | `rounded-md` ⚖ (radius token decides final) |
| `rounded-1` / `-2` / `-3` | `rounded-sm` / `rounded-md` / `rounded-lg` |
| `rounded-4` (1rem) | `rounded-xl` |
| `rounded-5` (2rem) | `rounded-4xl` / `rounded-3xl` ⚖ |
| `rounded-circle` | `rounded-full` |
| `rounded-pill` | `rounded-full` |
| `shadow-sm` | `shadow-sm` ⚖ (lighter than Bootstrap) |
| `shadow` | `shadow-md` ⚖ |
| `shadow-lg` | `shadow-lg` ⚖ |

- **Shadows are re-tuned to a restrained elevation ladder** (Iris: replace Bootstrap's heavy
  `0 .5rem 1rem rgba(0,0,0,.15)`). Use the sheet's ladder; map by *visual weight*, not by name.
- **Radius is unified** to one scale: cards `xl`, controls `lg`, pills `full` (see sheet).

## 6. Typography

| Bootstrap | Tailwind |
|---|---|
| `fw-bold` / `font-weight-bold` | `font-bold` |
| `fw-semibold` / `fw-normal` / `fw-light` | `font-semibold` / `font-normal` / `font-light` |
| `text-uppercase` | `uppercase` |
| `text-decoration-none` | `no-underline` |
| `text-center` / `-start` / `-end` | `text-center` / `text-start` / `text-end` |
| `fs-1` … `fs-6` | static `text-*` scale ⚖ (Bootstrap is fluid, Tailwind is static) |
| `display-1` … `display-6` | `text-6xl`+ ⚖ |
| `small` | `text-sm` |
| `lead` | `text-lg`/`text-xl` ⚖ |

- Real weights: load Roboto **400/500/700** (today `layout.jsx` loads only 400; faux-bold is a QA finding).
- One type scale — the sheet owns sizes; `fs-*`/`display-*` are **per-usage** decisions, not batch.

## 7. Visibility & screen-reader

| Bootstrap | Tailwind |
|---|---|
| `visually-hidden` | `sr-only` |
| `visually-hidden-focusable` | `sr-only focus:not-sr-only` |
| `text-hide` | not used here |

Keep `aria-hidden`/`aria-label` semantics exactly as-is — these are accessibility contracts.

## 8. Position & z-index

| Bootstrap | Tailwind |
|---|---|
| `position-fixed` / `-absolute` / `-relative` / `-sticky` | `fixed` / `absolute` / `relative` / `sticky` |
| `top-0` / `bottom-0` / `start-0` / `end-0` | `top-0` / `bottom-0` / `start-0` / `end-0` |
| `fixed-bottom` | `fixed bottom-0 inset-x-0` |
| `z-0` / `z-1` / `z-2` / `z-3` (literal 0–3) | `z-0` / `z-10` / `z-20` / `z-30` |
| `z-n1` | `-z-10` |

- Bootstrap z-utilities are literal `0..3`; Tailwind's step is 10. `z-3 → z-30` preserves "above normal
  content". The fixed navbar may need `z-50` once overlays/lightbox land — finalized in the Navbar rebuild.
- `translate-middle` / `start-50 top-50` centering → `-translate-x-1/2 -translate-y-1/2` + `left-1/2 top-1/2`.

## 9. Sizing, images & backgrounds

| Bootstrap | Tailwind |
|---|---|
| `w-100` / `h-100` | `w-full` / `h-full` |
| `w-50` / `h-50` / `w-auto` | `w-1/2` / `h-1/2` / `w-auto` |
| `img-fluid` | `max-w-full h-auto` (Tailwind Preflight already does this for `<img>`) |
| `mw-100` | `max-w-full` |
| `min-vh-100` | `min-h-screen` (or `min-h-dvh`) |
| `ratio ratio-16x9` | `aspect-video` / `aspect-[16/9]` |
| `object-fit-cover` / `-contain` | `object-cover` / `object-contain` |
| `overflow-hidden` / `-auto` | `overflow-hidden` / `overflow-auto` |

## 10. Bootstrap components — structured, not utility-swept

These classes carry both styling and behavior; each is rebuilt in its own task. Do **not** convert them to a
utility string as part of a mechanical pass.

| Bootstrap | Owner / treatment |
|---|---|
| `container` / `container-fluid` | `container mx-auto px-*` (rhythm padding from sheet) |
| `btn`, `btn-sm`, `btn-secondary`, `btn-primary`, `btn-outline-light` | shadcn `Button` milestone; interim Tailwind component classes from sheet |
| `card`, `card-body`, `card-title`, `card-text`, `card-header`, `card-footer`, `card-img` | Pages/cards sweep → Tailwind card component |
| `navbar`, `navbar-expand-lg`, `navbar-dark`, `navbar-brand`, `navbar-nav`, `nav-item`, `nav-link`, `navbar-toggler(-icon)`, `collapse`, `collapsing`, `show` | Navbar task: React state collapse rebuild (delete `handleCollapse` classList hack + `data-bs-toggle`) |
| `carousel`, `carousel-fade`, `carousel-inner`, `carousel-indicators`, `carousel-control-prev/next(-icon)`, `active`, `slide`, `prev`, `next` | Carousel task: hand-built shared component |
| `form-control`, `form-select`, `form-label`, `is-invalid` (0 hits) | Contáctanos task: rebuild focus/error states |
| `badge`, `alert`, `modal`, `offcanvas`, `dropdown`, `toast*` | None in current markup; use shadcn milestone if introduced |

### Bootstrap JS
`importBsJS.js` (`bootstrap.bundle.min.js`) exists only for `navbar` collapse + `carousel` + lightbox
data-API. It is deleted in the carousel/navbar tasks once those are rebuilt. No JS dependency maps in this table.

---

## 11. Layout-shell mapping (this task's sweep)

Applied to `footer`, `barraContacto`, `tituloPagina`, `navbar` and their co-located CSS.

> **Status: IMPLEMENTED (SOL-52).** The three shell components are converted and their co-located CSS
> deleted; `npm run lint` + `npm run build` green and rendered at 1440×900 + 390×844. The notes below
> record the mapping; the shipped classes are the authority.

### `footer.jsx` — ✅ done (CSS deleted)
- Columns → `grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-5` (5 links; grid is cleaner
  than the old flex row, and the 5 columns center naturally).
- Links → `inline-flex items-center gap-2 font-bold uppercase text-white/80 transition-colors hover:text-white`
  — **`text-white/80` replaces the failing `text-white-50` (3.84:1 → 7.33:1 AA)**; `no-underline` inherited
  from the base contract.
- `<hr className="my-2 border-white/15">`; description `mx-auto mt-6 mb-2 max-w-3xl text-center`; copyright
  `p-3 text-center`. `bg-primary bg-gradient` → `bg-primary` (no gradient). Square corners, `mt-auto w-full`.
- `.footer-link:hover { color:white !important }` deleted — `hover:text-white` supersedes it.

### `barraContacto.jsx` — ✅ done (CSS deleted)
- `d-lg-none` → `lg:hidden`; `fixed-bottom` → `fixed inset-x-0 bottom-0`; `z-index:2` → **`z-30`**.
- `bg-primary bg-gradient border-top border-secondary` → `bg-primary border-t border-secondary` (no gradient).
- Buttons → shared `inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg font-medium`
  (48px target ≥44px) + `bg-secondary text-white` and `border border-white/40 text-white`.
- Safe-area kept: `pb-[calc(0.5rem_+_env(safe-area-inset-bottom,0px))]` and spacer
  `h-[calc(56px_+_env(safe-area-inset-bottom,0px))]`. **Arbitrary-value rule: use `_` for spaces** — a raw
  `+` produces malformed `calc(56px+env(...))` and a build warning (verified); `_+_` emits valid CSS.

### `tituloPagina.jsx` — ✅ done (CSS deleted)
- Container `relative mb-6 overflow-hidden rounded-2xl`; image `h-[240px] w-full object-cover sm:h-[320px] lg:h-[400px]`.
- Scrim element `pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/60`.
- Title/subtitle in a flex overlay `absolute inset-0 flex flex-col items-center justify-center px-4 text-center`;
  H1 `text-4xl font-bold text-white md:text-5xl`, subtitle `text-lg text-white/90`, both with
  `[text-shadow:0_1px_2px_rgba(0,0,0,0.7)]`. Fixed `top:175px/225px` offsets and the 385/270px media queries are gone.
- IDs `#imagenTitulo`/`#tituloPaginaTitulo`/`#textoPaginaTitulo` kept as hooks; `mb-4`→`mb-6`. One `<h1>` per page preserved.

### `navbar.jsx` / `navbar.css`
- Structural rebuild in the **Navbar task** (state-based collapse); this table only supplies the utility
  vocabulary. Remove `handleCollapse`, `data-bs-toggle`, `data-bs-target`, `.collapse/.collapsing/.show`.
- `position-fixed w-100 top-0 z-3 bg-gradient bg-primary navbar-dark` → `fixed top-0 inset-x-0 z-50`
  (final z from Navbar task) + `bg-primary`.
- `.navbar-brand:hover { transform: scale(1.03) }` → `transition` + `hover:scale-[1.03]` or, per Iris,
  replace surface scaling with a non-scaling hover treatment. ⚖
- Radius `.375rem` bottom corners → unified radius token.

---

## 12. Verification for the sweep

1. `npm run lint` + `npm run build` clean.
2. Rendered side-by-side at **1440×900** and **390×844** for every touched page (QA gate, Vera).
3. No Bootstrap utility/`bs-*` residue in emitted CSS; `importBsJS`/`bootstrap`/`sass`/`custom.scss`/
   `autoprefixer` removed only in their owning tasks.
4. Text contrast ≥4.5:1 (≥3:1 large); `focus-visible` ring present; `prefers-reduced-motion` honored.
5. Breakpoints verified at the new Tailwind cuts (640/768/1024/1280/1536), including `<Imagen sizes>`.
