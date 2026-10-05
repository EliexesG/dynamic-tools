import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Composes conditional class strings with Tailwind conflict resolution
 * (clsx joins, tailwind-merge resolves duplicate/conflicting utilities so
 * the last class wins — the `ui/` primitives exploit this for overrides).
 *
 * Usually aliased via `cn`; registry components import the same helper from
 * the `cn` npm package — identical runtime behavior.
 *
 * @param {...(string | Object | Array)} inputs clsx-style class inputs
 *   (strings, conditionally falsy values, nested objects/arrays).
 * @returns {string} The merged, deduped className string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
