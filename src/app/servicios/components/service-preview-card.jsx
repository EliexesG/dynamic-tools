import { HeartHandshake, SquareArrowOutUpRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";

/**
 * Service preview card for the home page: title (with icon), clipped
 * description and a "Ver más" link to the services listing. Built from
 * `ui/` card parts (header / content / footer). Text-only by data design —
 * the services data carries no media, so the gallery-carousel preview
 * rule does not apply here.
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.title       Service name (Spanish; data-shape contract from `src/lib/data.js`).
 * @param {string}  props.description Service description (Spanish).
 * @param {string}  [props.className] Extra classes for the outer article wrapper.
 * @returns {JSX.Element} The home preview card.
 */
export default function ServicePreviewCard({ title, description, className }) {
  return (
    <article className={className}>
      <Card className="h-full p-4 gap-0 border-border transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        {/* Card header — centered service title with its brand icon */}
        <CardHeader className="px-0">
          <CardTitle asChild className="text-center text-h3 text-primary">
            <h3>
              <HeartHandshake aria-hidden="true" className="size-6" />
              {title}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-4 flex-1 flex flex-col">
          {/* Description — 3-line clamp preview */}
          <p className="mt-3 line-clamp-3 flex-1 text-body text-ink-muted">
            {description}
          </p>
        </CardContent>
        {/* Card footer — link to the services page */}
        <CardFooter className="px-0 mt-auto">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/servicios">
              <SquareArrowOutUpRight aria-hidden="true" className="size-5" />
              {" Ver más"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
