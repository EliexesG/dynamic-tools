import ExpandableText from "@/app/components/expandable-text";
import { Card } from "@/app/components/ui/card";

/**
 * Service card: teal title band on the left, expandable description on the
 * right (the toggle/animation island is handled by `expandable-text.jsx`,
 * which keeps this card server-rendered).
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.title       Service name (Spanish; band text and image alt context).
 * @param {string}  props.description Service description (Spanish; collapsed to 3 lines with the shared expander).
 * @returns {JSX.Element} The service card.
 */
export default function ServiceCard({ title, description }) {
  return (
    <Card asChild className="mb-6 border-border bg-surface-muted p-5 gap-4">
      <article>
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12">
          {/* Title band — teal on the left rail (white text on color) */}
          <div className="flex items-center justify-center rounded-lg bg-primary px-4 py-6 text-center md:col-span-4">
            <h2 className="text-h3 font-bold text-white">{title}</h2>
          </div>
          {/* Expandable description — shared expander owns the toggle */}
          <div className="md:col-span-8">
            <ExpandableText text={description} />
          </div>
        </div>
      </article>
    </Card>
  );
}
