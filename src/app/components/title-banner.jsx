import { cn } from "@/lib/cn";

/**
 * Reusable heading banner: a teal (`bg-primary`) band with bold white text
 * used as an in-page section title. Typographic size is delegated via
 * `className` (e.g. `text-h2`, `text-h3`); the white-text-on-color rule is
 * guaranteed by the base classes, so consumers must not override the color.
 *
 * Extracted after the same band recipe appeared in three components.
 *
 * @param {Object}  props         Component props.
 * @param {string}  [props.as]    Element name to render (defaults to "h2").
 * @param {string}  [props.id]    Optional DOM id (used as anchor target).
 * @param {string}  [props.className] Extra classes for size/spacing; avoid overriding text colors.
 * @param {React.ReactNode} props.children Heading text (Spanish).
 * @param {any} props.rest  Extra props for the rendered element.
 * @returns {JSX.Element} The rendered heading banner.
 */
export default function TitleBanner({
  as: Tag = "h2",
  id,
  className,
  children,
  ...props
}) {
  return (
    // Teal heading band — white bold centered text with brand radius
    <Tag
      id={id}
      className={cn(
        "rounded-lg bg-primary px-4 py-3 text-center font-bold text-white!",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
