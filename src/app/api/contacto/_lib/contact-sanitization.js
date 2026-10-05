import "server-only";

/**
 * Text/HTML sanitization helpers consumed by the validation service AND by
 * the route's email templates.
 *
 * BE-only (guarded): holds no secrets or process state, but belongs to the
 * API service layer — never import from components/pages.
 */

/**
 * Escapes HTML-special characters for server-rendered email bodies.
 *
 * @param {unknown} value Raw untrusted value to serialize.
 * @returns {string} The HTML-safe string (`undefined/null` → ``).
 */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Escapes HTML and keeps line breaks visually intact (newline → `<br>`).
 *
 * @param {unknown} value Raw untrusted value to serialize inside a block email section.
 */
export function escapeHtmlMultiline(value) {
  return escapeHtml(value).replace(/\r\n?|\n/g, "<br>");
}

/**
 * Strips control characters and normalizes CRLF — the baseline sanitization
 * for free-text request fields before they reach email templates.
 */
export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n");
}

/**
 * Sanitizes a value that lands in a template header (email subject/H1) —
 * collapses all newlines to spaces (header injection shield).
 */
export function sanitizeHeader(value) {
  return sanitizeText(value).replace(/[\n]+/g, " ").trim();
}

/**
 * Sanitizes an attachment filename: strips control characters, slashes/__
 * and leading dots, caps at 255 bytes.
 */
export function sanitizeFilename(name) {
  return String(name ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[\\/]+/g, "_")
    .replace(/\.{2,}/g, "_")
    .replace(/^\.+/, "")
    .trim()
    .slice(0, 255);
}
