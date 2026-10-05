"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/app/components/ui/button";

/** Collapsed height in px: 3 lines of `text-body` (1rem × 1.625 ≈ 26px each). */
const COLLAPSED_MAX_HEIGHT = 78;

/**
 * Long-text expander: 3 lines when collapsed, full text when expanded, with
 * a smooth `max-height` transition in both directions.
 *
 * Measurement contract (pure Tailwind animates `max-height` only —
 * `line-clamp` and `grid-rows` swaps are not animatable):
 *  - the toggle button renders only when the collapsed text actually
 *    overflows. The gate compares `scrollHeight` against the static
 *    collapsed height (NOT the live `clientHeight`, which races the CSS
 *    transition on collapse and would yield a false negative), is latched
 *    and re-measured on resizes and after font load
 *    (`document.fonts.ready`) since the fallback font can change heights;
 *  - expansion animates to the measured `scrollHeight` (no fixed overshoot,
 *    so the easing is always perceived at full duration);
 *  - while expanded, window resizes re-measure (text reflows to more lines
 *    on narrow viewports).
 *
 * Reduced motion is covered by the global `prefers-reduced-motion` reset
 * (the transition collapses to ~0ms and the state jumps cleanly).
 *
 * @param {Object}  props             Component props.
 * @param {string}  props.text        Body text (Spanish).
 * @param {string}  [props.className] Extra classes for the wrapper block (e.g. spacing).
 * @returns {JSX.Element} The expandable paragraph with its toggle button.
 */
export default function ExpandableText({ text, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [expandedMaxHeight, setExpandedMaxHeight] =
    useState(COLLAPSED_MAX_HEIGHT);
  const textRef = useRef(null);
  const textId = useId();

  /**
   * Measures the full content height of the paragraph. With `overflow-hidden`
   * + clamped `max-height`, `scrollHeight` still returns the unclipped
   * content height, so this works from the collapsed state.
   *
   * @returns {number} The text height in px, or the collapsed fallback when no ref.
   */
  const measureText = useCallback(() => {
    return textRef.current?.scrollHeight ?? COLLAPSED_MAX_HEIGHT;
  }, []);

  // Overflow gate: measured against the static collapsed height, never the
  // live `clientHeight` — the latter races the CSS transition right after a
  // collapse commit (computed max-height is still large) and would return a
  // false negative that unmounts the button. Latching: the gate only turns
  // on (a real overflow is stable for static text).
  useEffect(() => {
    const updateOverflow = () => {
      const el = textRef.current;
      if (el && !isExpanded) {
        setHasOverflow(el.scrollHeight > COLLAPSED_MAX_HEIGHT + 1);
      }
    };

    updateOverflow();
    document.fonts?.ready.then(updateOverflow);

    window.addEventListener("resize", updateOverflow);
    return () => window.removeEventListener("resize", updateOverflow);
  }, [isExpanded, text]);

  // While expanded: keep the open height in sync with reflow on resize
  useEffect(() => {
    if (!isExpanded) return undefined;

    const onResize = () => setExpandedMaxHeight(measureText());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isExpanded, measureText]);

  /**
   * Toggles expansion; measures the exact open height on first expand so the
   * transition always ends exactly at the end of the text.
   *
   * @returns {void}
   */
  const toggle = useCallback(() => {
    if (!isExpanded) {
      setExpandedMaxHeight(measureText());
    }
    setIsExpanded((current) => !current);
  }, [isExpanded, measureText]);

  return (
    <div className={className}>
      {/* Expandable body — max-height transition, exact measured open height */}
      <p
        id={textId}
        ref={textRef}
        style={{
          maxHeight: isExpanded ? expandedMaxHeight : COLLAPSED_MAX_HEIGHT,
        }}
        className="overflow-hidden text-justify text-body text-ink transition-[max-height] duration-300 ease-out-soft"
      >
        {text}
      </p>
      {/* Toggle button — rendered only when text overflows the collapsed view */}
      {hasOverflow && (
        <div className="mt-2 flex justify-end">
          <Button
            type="button"
            variant="outline-pill"
            size="sm"
            className="text-small [&_svg]:size-5"
            onClick={toggle}
            aria-expanded={isExpanded}
            aria-controls={textId}
          >
            {isExpanded ? "Ver menos" : "Ver más"}
            <ChevronDown
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
