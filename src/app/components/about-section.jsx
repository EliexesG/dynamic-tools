import TitleBanner from "@/app/components/title-banner";

/**
 * About content section: teal banner heading, a small accent divider and
 * the section text rendered as split paragraphs.
 *
 * Text format contract: the `{title}` uses `|` as paragraph separator in
 * `src/lib/data.js`; the first segment renders as a centered lead line
 * (bordered bottom), the rest as justified body paragraphs. Keep the data
 * keys Spanish (data contract), component API in English.
 *
 * @param {Object}  props              Component props.
 * @param {string}  props.anchorId     DOM id used as scroll anchor (matches the navbar `href="#..."` links).
 * @param {string}  props.title        Section heading text (Spanish; also the banner label).
 * @param {string}  props.description  Paragraphs separated by `|` (Spanish).
 * @param {string}  [props.className]  Extra classes for the section wrapper.
 * @returns {JSX.Element} The about content section.
 */
export default function AboutSection({
  anchorId,
  title,
  description,
  className,
}) {
  return (
    <section className={`mb-6 ${className ?? ""}`}>
      {/* Section banner — anchored teal band */}
      <TitleBanner id={anchorId} className="text-h2 scroll-mt-24">
        {title}
      </TitleBanner>
      {/* Accent divider — short secondary pill under the banner */}
      <div
        className="mx-auto mt-3 h-1 w-16 rounded-full bg-secondary"
        aria-hidden="true"
      />
      {/* Paragraphs — split on `|`; segments are trimmed so the copy
          constants are free to use multi-line template literals */}
      <article className="mt-6">
        {description
          .split("|")
          .map((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "mb-4 border-b border-secondary pb-2 text-center text-body-lg font-semibold"
                  : "mb-4 text-justify text-body last:mb-0"
              }
            >
              {paragraph}
            </p>
          ))}
      </article>
    </section>
  );
}
