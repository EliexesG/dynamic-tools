import "server-only";

import { NextResponse } from "next/server";

/**
 * Shared API response helpers — the common error envelope for every route
 * handler under `src/app/api/` (official `_folder` colocation at the API
 * root; no feature prefix because it belongs to all routes).
 */

/**
 * Builds the standard JSON error response for API route handlers:
 * `{ response: "error", status, error: message, code, field? }` with the
 * matching HTTP status. Keeps the envelope shape consistent across
 * endpoints so the FE layer can toast `error`/`code`/`field` uniformly.
 *
 * @param {number} status HTTP status code (400/413/415/429/502/…).
 * @param {string} code Machine-readable error code (e.g. `VALIDATION_ERROR`, `RATE_LIMITED`).
 * @param {string} message User-facing Spanish error text (toasted by the form layer).
 * @param {string} [field] Optional payload field the error belongs to (FE inline errors).
 * @returns {import("next/server").NextResponse} The ready-to-return JSON error response.
 */
export function errorResponse(status, code, message, field) {
  return NextResponse.json(
    {
      response: "error",
      status,
      error: message,
      code,
      ...(field ? { field } : {}),
    },
    { status },
  );
}

/**
 * Builds the standard JSON success response for API route handlers:
 * `{ response: "success", status, ...extra }` with the matching HTTP
 * status — the success counterpart of `errorResponse`, same envelope
 * discipline (`response` + `status` are always present).
 *
 * @param {number} [status=200] HTTP status code (200/201/…).
 * @param {Object} [extra] Optional extra JSON fields for the body.
 * @returns {import("next/server").NextResponse} The ready-to-return JSON success response.
 */
export function successResponse(status = 200, extra = {}) {
  return NextResponse.json(
    {
      response: "success",
      status,
      ...extra,
    },
    { status },
  );
}
