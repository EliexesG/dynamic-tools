/**
 * Submits a contact request to the site's own API route and normalizes the
 * response into a single result shape for the form layer.
 *
 * The returned object always carries `ok` (HTTP success), `httpStatus` and
 * `retryAfter` (parsed from the rate-limiter's `Retry-After` header when
 * present) merged over the JSON body, so callers can distinguish server
 * errors from rate-limit rejections without touching fetch internals.
 *
 * @param {Object} data  Request payload — the `/api/contacto` body contract:
 *   `{ asunto, cuerpo: { correo, peticion, tipo, fecha }, adjuntos? }`.
 * @returns {Promise<{ok: boolean, httpStatus: number, retryAfter: number|null} & Object<string, *>>}
 *   Normalized response: JSON body fields + transport meta (`ok`,
 *   `httpStatus`, `retryAfter`).
 */
export async function sendContactRequest(data) {
  const response = await fetch("/api/contacto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  let json = {};

  try {
    json = await response.json();
  } catch {
    // Non-JSON body (e.g. HTML error page): fall through with an empty body
    // — `ok`/`httpStatus` still describe the transport outcome.
    json = {};
  }

  const retryAfterHeader = response.headers.get("Retry-After");
  const retryAfter = Number(retryAfterHeader);

  return {
    ...json,
    ok: response.ok,
    httpStatus: response.status,
    retryAfter:
      Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
  };
}
