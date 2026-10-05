import "server-only";

/**
 * Shared API rate limiter — BE-only utility for every route handler under
 * `src/app/api/` (official `_folder` colocation at the API root; no feature
 * prefix because it belongs to all routes).
 *
 * Implementation: in-memory fixed-window buckets keyed by caller identity.
 * Officially the Backend-for-Frontend pattern of the Next.js docs.
 *
 * Scaling caveats (documented, not blocking today):
 *  - in-memory state is **per instance** and resets on every server
 *    restart — on multi-instance/serverless deployments swap the internals
 *    for a shared store (e.g. `@upstash/ratelimit`) behind this same
 *    signature so route handlers don't change;
 *  - complement with host-level limits (Vercel WAF / nginx) per the docs.
 *
 * Callers namespace the key with their route scope so endpoints never share
 * buckets: `checkRateLimit(\`contacto:${ip}\`)`.
 */

const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;
const DEFAULT_MAX_BUCKETS = 5000;

const rateLimitBuckets = new Map();

/**
 * Extracts the client IPv4/IPv6 string from standard proxy headers
 * (`x-forwarded-for` first entry wins, else `x-real-ip`).
 *
 * @param {Headers} headers Incoming request headers.
 * @returns {string} The client IP, or `"unknown"` when no proxy chain exists.
 */
export function getClientIp(headers) {
  const forwarded = headers?.get?.("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return headers?.get?.("x-real-ip") || "unknown";
}

/**
 * Rate limiter per namespaced key (e.g. `` `${scope}:${clientIp}` ``): a
 * fixed window of `maxRequests` calls per `windowMs`. Buckets purge
 * aggressively when past `maxBuckets` entries (memory-exhaustion shield).
 *
 * @param {string} key Namespaced identity key (`"${scope}:${clientIp}"`) — each route owns its scope so buckets never mix.
 * @param {Object} [options] Per-endpoint overrides (defaults suit a public form endpoint).
 * @param {number} [options.windowMs=600000] Window length in milliseconds (default 10 min).
 * @param {number} [options.maxRequests=5] Allowed requests inside the window.
 * @param {number} [options.maxBuckets=5000] Max tracked keys before aggressive purge.
 * @param {number} [now=Date.now] Timestamp source (injected for testability).
 * @returns {{allowed: boolean, remaining: number, resetAt: number, retryAfterSeconds?: number}} Decision descriptor; on `allowed=false`, carries `retryAfterSeconds`.
 */
export function checkRateLimit(
  key,
  {
    windowMs = DEFAULT_WINDOW_MS,
    maxRequests = DEFAULT_MAX_REQUESTS,
    maxBuckets = DEFAULT_MAX_BUCKETS,
  } = {},
  now = Date.now(),
) {
  if (rateLimitBuckets.has(key)) {
    const current = rateLimitBuckets.get(key);
    if (now >= current.resetAt) {
      rateLimitBuckets.delete(key);
    }
  }

  if (rateLimitBuckets.size > maxBuckets) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (now >= bucket.resetAt) rateLimitBuckets.delete(bucketKey);
    }
  }

  const entry = rateLimitBuckets.get(key);

  if (!entry) {
    const resetAt = now + windowMs;
    rateLimitBuckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Clears the in-memory rate-limit map (internal-only, imported solely by
 * test tooling until the day tests exist).
 */
export function resetRateLimitForTests() {
  rateLimitBuckets.clear();
}
