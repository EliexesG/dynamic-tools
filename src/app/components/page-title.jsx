import Image from "./image";

/**
 * Page hero: full-width image with a dark gradient overlay carrying the
 * page `title` and `subtitle` (white text on the darkened photo), plus a
 * bottom divider. Lives once at the top of every page; no local state.
 *
 * @param {Object}  props           Component props.
 * @param {string}  props.imageSrc  Hero image URL (inline in each page).
 * @param {string}  props.title     Heading text (Spanish, becomes both the visual `h1` and the image `alt`).
 * @param {string}  props.subtitle  Description line under the heading (Spanish).
 * @returns {JSX.Element} The hero markup ending with its bottom divider.
 */
export default function PageTitle({ imageSrc, title, subtitle }) {
  return (
    <>
      {/* Hero image stage — rounded photo strip with centered overlay text */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <Image
          id="page-title-image"
          src={imageSrc}
          alt={title}
          height={3000}
          width={3000}
          sizes="100vw"
          className="h-60 w-full object-cover sm:h-80 lg:h-100"
        />
        {/* Contrast overlay — dark gradient so white text is legible on any photo */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/60"
          aria-hidden="true"
        />
        {/* Overlay heading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1
            id="page-title-heading"
            className="text-4xl text-white font-bold [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] md:text-display"
          >
            {title}
          </h1>
          <p
            id="page-title-description"
            className="text-body-lg text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
          >
            {subtitle}
          </p>
        </div>
      </div>
      {/* Bottom divider before page content */}
      <hr className="mb-6" />
    </>
  );
}
