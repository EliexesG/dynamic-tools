import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import TitleBanner from "@/app/components/title-banner";
import GalleryCarousel from "@/app/components/gallery-carousel";
import ExpandableText from "@/app/components/expandable-text";

/**
 * Machinery detail card: teal title band on top, then the image carousel
 * (fullscreen-capable) and the expandable free-text description below.
 * Server component — interactivity lives in the browsing/expand islands
 * (`gallery-carousel`, `expandable-text`); enlarged views, navigation,
 * indicators and a11y concerns are owned by the carousel.
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.title       Machine name (Spanish; becomes the band text, media label and image alt prefix).
 * @param {string}  props.description Machine description (Spanish).
 * @param {Array}   props.images      Machine images: `{ id, url }` (data contract from `src/lib/data.js`).
 * @returns {JSX.Element} The machinery card with its gallery.
 */
export default function MachineCard({ title, description, images }) {
  return (
    <Card className="mb-6 gap-0 border-s-4 border-s-primary bg-surface p-5">
      {/* Title band — full-width teal banner above the gallery */}
      <CardHeader className="px-0 gap-2">
        <TitleBanner
          id={`machine-${title}`}
          className="w-full rounded p-2 text-h3"
        >
          {title}
        </TitleBanner>
      </CardHeader>
      <CardContent className="px-0">
        {/* Machine gallery — shared carousel with arrows, dots and
            fullscreen (fullscreen enlarged view, Radix-provided) */}
        <GalleryCarousel
          items={images}
          ariaLabel={`Galería de imágenes de ${title}`}
          imageWidth={1600}
          imageHeight={1201}
          allowFullscreen
        />
        {/* Description — expandable free text below the gallery */}
        <ExpandableText text={description} className="mt-4" />
      </CardContent>
    </Card>
  );
}
