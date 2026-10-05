import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

import GalleryCarousel from "@/app/components/gallery-carousel";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";

/** Max images rendered in a preview card thumbnail carousel. */
const PREVIEW_IMAGE_LIMIT = 3;

/**
 * Machinery preview card for the home page: a small carousel (up to
 * `PREVIEW_IMAGE_LIMIT` images — always the shared `gallery-carousel`,
 * even for a single image), title, clipped description and the
 * "Ver más" link to the machinery listing. Built from `ui/` card parts.
 *
 * @param {Object}  props             Component props.
 * @param {Object}  props.machine     Machinery entry from `src/lib/data.js`: `{ titulo, descripcion, imagenes[] }` (data-shape contract — keys stay Spanish).
 * @param {string}  [props.className] Extra classes for the outer article wrapper.
 * @returns {JSX.Element} The home preview card.
 */
export default function MachinePreviewCard({ machine, className }) {
  const { titulo: title, descripcion: description, imagenes: images } = machine;

  return (
    <article className={className}>
      <Card className="h-full p-4 gap-0 border-border transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        {/* Card header — centered machine title */}
        <CardHeader className="px-0">
          <CardTitle asChild className="text-center text-h3 text-primary">
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-4 flex-1 flex flex-col">
          {/* Machine gallery — shared mini carousel, capped at PREVIEW_IMAGE_LIMIT */}
          <GalleryCarousel
            items={images.slice(0, PREVIEW_IMAGE_LIMIT)}
            ariaLabel={`Galería de imágenes de ${title}`}
            sizes="(max-width: 767px) 100vw, 33vw"
          />
          <p className="mt-3 line-clamp-3 flex-1 text-body text-ink-muted">
            {description}
          </p>
        </CardContent>
        {/* Card footer — link to the machinery page */}
        <CardFooter className="px-0 mt-auto">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/maquinaria">
              <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
              {" Ver más"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
