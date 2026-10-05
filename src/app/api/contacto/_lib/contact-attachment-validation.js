import "server-only";

import { fileTypeFromBuffer, reasonableDetectionSizeInBytes } from "file-type";

import { sanitizeFilename } from "./contact-sanitization";

/**
 * Attachment validation service: everything that guarantees a request's
 * files are what the client claims they are — extension allow-list, MIME
 * coherence and real magic-byte signature detection (`file-type`), plus the
 * running-total size cap.
 *
 * Security note: client-supplied `filename`/`contentType` are attacker-
 * controlled (a `.exe` renamed to `.pdf` sends any MIME it wants), so the
 * detected magic-byte signature is the only server-side truth about what a
 * file actually is.
 *
 * BE-only (guarded) — imported by `../route.js`.
 */

/** Total attachments size cap per request (in bytes, ≈5 MB). */
export const MAX_CONTACT_ATTACHMENT_BYTES = 5_000_000;
/** Maximum number of files per request (matches the form input `multiple` cap). */
export const MAX_CONTACT_ATTACHMENT_COUNT = 10;

/** File extensions accepted as attachments (lowercase, no dot). */
export const ALLOWED_EXTENSIONS = [
  "pdf",
  "png",
  "jpeg",
  "jpg",
  "gif",
  "docx",
  "xlsx",
];

/**
 * MIME type associated with every allowed extension (verbatim match when
 * the client sends `contentType`; also the fallback guess for Nodemailer).
 */
export const ALLOWED_MIME_TYPES = {
  pdf: "application/pdf",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  gif: "image/gif",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

/**
 * Extracts the sanitized lowercase file extension (no leading dot), or the
 * empty string for dotless/hidden-dot names.
 */
export function extensionOf(filename) {
  const clean = sanitizeFilename(filename).toLowerCase();
  const idx = clean.lastIndexOf(".");
  if (idx <= 0 || idx === clean.length - 1) return "";
  return clean.slice(idx + 1);
}

/**
 * Resolves the MIME type for an attachment; falls back to
 * `application/octet-stream` for unknown extensions (then rejected
 * upstream by callers that use `ALLOWED_EXTENSIONS`).
 */
export function attachmentContentType(filename) {
  return (
    ALLOWED_MIME_TYPES[extensionOf(filename)] ?? "application/octet-stream"
  );
}

/**
 * Computes the decoded byte size a base64 string represents — delegated to
 * Node's Buffer (exact padding handling); the `server-only` guard
 * guarantees a Node runtime, so no browser fallback is needed.
 */
export function base64ByteLength(value) {
  return Buffer.byteLength(String(value ?? ""), "base64");
}

/**
 * Detects the real file type of a base64-encoded payload by its magic
 * bytes (`file-type` reads the first ~4100 bytes). Returns the detected
 * `{ ext, mime }` or `undefined` when the signature is unknown — callers
 * decide whether that mismatch rejects the request (anti-spoof guard).
 *
 * @param {string} content Base64 file content from the request body.
 * @returns {Promise<{ext: string, mime: string} | undefined>} Detected type, when recognized.
 */
async function detectFileType(content) {
  const bytes = Buffer.from(
    String(content ?? "").slice(
      0,
      Math.ceil((reasonableDetectionSizeInBytes * 4) / 3) + 4,
    ),
    "base64",
  );

  return fileTypeFromBuffer(new Uint8Array(bytes));
}

/**
 * Validates a request's attachment list in one pass: shape, count, extension
 * allow-list, base64 encoding significance, MIME-vs-extension coherence and
 * real file-signature detection (`file-type` magic bytes — the anti-spoof
 * guard against maliciously renamed files). Enforces the running-total size
 * cap across all attachments together.
 *
 * @param {Array|undefined|null} attachments attachments from the request body.
 * @returns {Promise<{ok: true, totalBytes: number} | {ok: false, status: number, code: string, message: string, field: string}>}
 *   The ok case carries the decoded total byte count; the failure case is a
 *   ready-to-send HTTP error descriptor (localized message).
 */
export async function checkAttachments(attachments) {
  // 1. Absent attachments simply means the request carried no files — valid
  //    (the form only shows the file input on quote requests).
  if (attachments === null || attachments === undefined) {
    return { ok: true, totalBytes: 0 };
  }

  // 2. Reject non-array payloads before iterating (defensive: it comes from
  //    untrusted JSON).
  if (!Array.isArray(attachments)) {
    return {
      ok: false,
      status: 400,
      code: "VALIDATION_ERROR",
      message: "El campo adjuntos debe ser una lista",
      field: "adjuntos",
    };
  }

  // 3. An empty list is equivalent to no attachments.
  if (attachments.length === 0) {
    return { ok: true, totalBytes: 0 };
  }

  // 4. Enforce the per-request file count cap.
  if (attachments.length > MAX_CONTACT_ATTACHMENT_COUNT) {
    return {
      ok: false,
      status: 413,
      code: "TOO_MANY_ATTACHMENTS",
      message: `No se permiten más de ${MAX_CONTACT_ATTACHMENT_COUNT} adjuntos`,
      field: "adjuntos",
    };
  }

  let totalBytes = 0;

  // 5. Walk every attachment, running the full per-file check chain below —
  //    the first failure aborts with its ready-made HTTP error descriptor.
  for (const attachment of attachments) {
    // 5.1 Shape: every entry must be an object.
    if (!attachment || typeof attachment !== "object") {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Adjunto con formato inválido",
        field: "adjuntos",
      };
    }

    // 5.2 Filename: sanitize it, then verify the claimed extension is in the
    //     allow-list (the name is attacker-controlled, never trusted).
    const filename = sanitizeFilename(attachment.filename);
    const extension = extensionOf(filename);

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_FILE_TYPE",
        message: `Tipo de archivo no permitido. Permitidos: ${ALLOWED_EXTENSIONS.join(", ")}`,
        field: "adjuntos",
      };
    }

    // 5.3 Content: must be a non-empty string to be decodable at all.
    if (
      typeof attachment.content !== "string" ||
      attachment.content.length === 0
    ) {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "El contenido del adjunto es inválido",
        field: "adjuntos",
      };
    }

    // 5.4 Encoding: base64 is the only encoding the pipeline supports.
    if (attachment.encoding !== undefined && attachment.encoding !== "base64") {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "La codificación del adjunto es inválida",
        field: "adjuntos",
      };
    }

    // 5.5 MIME coherence: if the client declares a contentType, it must match
    //     the extension's expected MIME (declared type ≠ proof, but a lie is
    //     cheap to reject here).
    if (
      attachment.contentType &&
      attachment.contentType !== ALLOWED_MIME_TYPES[extension]
    ) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_FILE_TYPE",
        message: "El tipo MIME del archivo no coincide con su extensión",
        field: "adjuntos",
      };
    }

    // 5.6 Real-signature detection — rejects files whose bytes do not match
    //     the claimed extension (the anti-renaming guard: a renamed .exe or
    //     a text file posing as .pdf never gets past this line).
    const detected = await detectFileType(attachment.content);
    if (!detected || detected.ext !== extension) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_FILE_TYPE",
        message: "El archivo no coincide con su extensión",
        field: "adjuntos",
      };
    }

    // 5.7 Size: accumulate the decoded bytes and enforce the running-total
    //     cap across the whole request (not per-file), aborting the walk as
    //     soon as it is exceeded.
    totalBytes += base64ByteLength(attachment.content);

    if (totalBytes > MAX_CONTACT_ATTACHMENT_BYTES) {
      return {
        ok: false,
        status: 413,
        code: "ATTACHMENT_TOO_LARGE",
        message: `El total de adjuntos supera el máximo de ${MAX_CONTACT_ATTACHMENT_BYTES / 1_000_000} MB`,
        field: "adjuntos",
      };
    }
  }

  // 6. All checks passed — hand back the decoded total byte count.
  return { ok: true, totalBytes };
}
