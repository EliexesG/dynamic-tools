import { HeartHandshake } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";

/**
 * Company values card: icon+title header and a muted description. Built
 * from `ui/` card parts; matches the other preview cards visually.
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.title       Value name (Spanish).
 * @param {string}  props.description Value description (Spanish).
 * @param {string}  [props.className] Extra classes for the outer article wrapper.
 * @returns {JSX.Element} The values card.
 */
export default function ValueCard({ title, description, className }) {
  return (
    <article className={className}>
      <Card className="h-full p-4 gap-0 border-border transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
        {/* Card header — centered value title with its brand icon */}
        <CardHeader className="px-0">
          <CardTitle asChild className="text-center text-h3 text-primary">
            <h3>
              <HeartHandshake aria-hidden="true" className="size-6" />
              {title}
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {/* Description — muted body text */}
          <p className="mt-3 flex-1 text-body text-ink-muted">{description}</p>
        </CardContent>
      </Card>
    </article>
  );
}
