import * as yup from "yup";

export const ALLOWED_TIPOS = ["Información", "Cotización"];

export const MAX_CONTACT_ATTACHMENT_BYTES = 5_000_000;
export const MAX_CONTACT_ATTACHMENT_COUNT = 10;

export const ALLOWED_EXTENSIONS = [
  "pdf",
  "png",
  "jpeg",
  "jpg",
  "gif",
  "docx",
  "xlsx",
];

export const ALLOWED_MIME_TYPES = {
  pdf: "application/pdf",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  gif: "image/gif",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_BUCKETS = 5000;

const rateLimitBuckets = new Map();

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeHtmlMultiline(value) {
  return escapeHtml(value).replace(/\r\n?|\n/g, "<br>");
}

export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n");
}

export function sanitizeHeader(value) {
  return sanitizeText(value).replace(/[\n]+/g, " ").trim();
}

export function sanitizeFilename(name) {
  return String(name ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[\\/]+/g, "_")
    .replace(/\.{2,}/g, "_")
    .replace(/^\.+/, "")
    .trim()
    .slice(0, 255);
}

export function extensionOf(filename) {
  const clean = sanitizeFilename(filename).toLowerCase();
  const idx = clean.lastIndexOf(".");
  if (idx <= 0 || idx === clean.length - 1) return "";
  return clean.slice(idx + 1);
}

export function attachmentContentType(filename) {
  return ALLOWED_MIME_TYPES[extensionOf(filename)] ?? "application/octet-stream";
}

export function base64ByteLength(value) {
  const clean = String(value ?? "").replace(/[^A-Za-z0-9+/=]/g, "");
  const padding = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
  return Math.max(0, Math.floor((clean.length * 3) / 4) - padding);
}

function base64PrefixBytes(value, count) {
  const slice = String(value ?? "").slice(0, Math.ceil((count * 4) / 3) + 4);
  if (typeof Buffer !== "undefined") {
    return Buffer.from(slice, "base64");
  }
  const binary = atob(slice);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function matchesSignature(bytes, extension) {
  if (!bytes || bytes.length < 3) return false;
  const at = (index) => bytes[index];
  switch (extension) {
    case "pdf":
      return at(0) === 0x25 && at(1) === 0x50 && at(2) === 0x44 && at(3) === 0x46;
    case "png":
      return at(0) === 0x89 && at(1) === 0x50 && at(2) === 0x4e && at(3) === 0x47;
    case "jpg":
    case "jpeg":
      return at(0) === 0xff && at(1) === 0xd8 && at(2) === 0xff;
    case "gif":
      return at(0) === 0x47 && at(1) === 0x49 && at(2) === 0x46;
    case "docx":
    case "xlsx":
      return (
        at(0) === 0x50 && at(1) === 0x4b && (at(2) === 0x03 || at(2) === 0x05 || at(2) === 0x07)
      );
    default:
      return false;
  }
}

export function checkAttachments(adjuntos) {
  if (adjuntos === null || adjuntos === undefined) {
    return { ok: true, totalBytes: 0 };
  }

  if (!Array.isArray(adjuntos)) {
    return {
      ok: false,
      status: 400,
      code: "VALIDATION_ERROR",
      message: "El campo adjuntos debe ser una lista",
      field: "adjuntos",
    };
  }

  if (adjuntos.length === 0) {
    return { ok: true, totalBytes: 0 };
  }

  if (adjuntos.length > MAX_CONTACT_ATTACHMENT_COUNT) {
    return {
      ok: false,
      status: 413,
      code: "TOO_MANY_ATTACHMENTS",
      message: `No se permiten más de ${MAX_CONTACT_ATTACHMENT_COUNT} adjuntos`,
      field: "adjuntos",
    };
  }

  let totalBytes = 0;

  for (const adjunto of adjuntos) {
    if (!adjunto || typeof adjunto !== "object") {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Adjunto con formato inválido",
        field: "adjuntos",
      };
    }

    const filename = sanitizeFilename(adjunto.filename);
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

    if (typeof adjunto.content !== "string" || adjunto.content.length === 0) {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "El contenido del adjunto es inválido",
        field: "adjuntos",
      };
    }

    if (adjunto.encoding !== undefined && adjunto.encoding !== "base64") {
      return {
        ok: false,
        status: 400,
        code: "VALIDATION_ERROR",
        message: "La codificación del adjunto es inválida",
        field: "adjuntos",
      };
    }

    if (
      adjunto.contentType &&
      adjunto.contentType !== ALLOWED_MIME_TYPES[extension]
    ) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_FILE_TYPE",
        message: "El tipo MIME del archivo no coincide con su extensión",
        field: "adjuntos",
      };
    }

    const prefix = base64PrefixBytes(adjunto.content, 16);
    if (!matchesSignature(prefix, extension)) {
      return {
        ok: false,
        status: 415,
        code: "UNSUPPORTED_FILE_TYPE",
        message: "El archivo no coincide con su extensión",
        field: "adjuntos",
      };
    }

    totalBytes += base64ByteLength(adjunto.content);

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

  return { ok: true, totalBytes };
}

export const contactSchema = yup.object({
  asunto: yup
    .string()
    .trim()
    .required("Debe indicar un asunto")
    .max(200, "El asunto es demasiado largo")
    .test("no-newlines", "El asunto contiene caracteres inválidos", (value) =>
      value ? !/[\r\n]/.test(value) : true
    ),
  cuerpo: yup
    .object({
      correo: yup
        .string()
        .trim()
        .required("Debe ingresar un correo electrónico")
        .email("Ingresar un correo válido")
        .max(254, "El correo es demasiado largo"),
      peticion: yup
        .string()
        .required("Debe ingresar la petición")
        .min(10, "La petición debe contener un mínimo de 10 carácteres")
        .max(5000, "La petición es demasiado larga"),
      tipo: yup
        .string()
        .trim()
        .required("Debe seleccionar el tipo de solicitud")
        .oneOf(ALLOWED_TIPOS, "Debe seleccionar el tipo de solicitud"),
      fecha: yup
        .string()
        .trim()
        .required("La fecha es obligatoria")
        .max(100, "La fecha es inválida"),
    })
    .required(),
  nombre: yup.string().trim().max(200, "El nombre es demasiado largo").nullable(),
  adjuntos: yup.array().nullable(),
});

export async function validateContactPayload(data) {
  try {
    const value = await contactSchema.validate(data, { abortEarly: true });
    return { ok: true, value };
  } catch (error) {
    return {
      ok: false,
      field: error?.path || "cuerpo",
      message: error?.errors?.[0] || "Datos de la solicitud inválidos",
    };
  }
}

export function getClientIp(headers) {
  const forwarded = headers?.get?.("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return headers?.get?.("x-real-ip") || "unknown";
}

export function checkRateLimit(key, now = Date.now()) {
  if (rateLimitBuckets.has(key)) {
    const current = rateLimitBuckets.get(key);
    if (now >= current.resetAt) {
      rateLimitBuckets.delete(key);
    }
  }

  if (rateLimitBuckets.size > RATE_LIMIT_MAX_BUCKETS) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (now >= bucket.resetAt) rateLimitBuckets.delete(bucketKey);
    }
  }

  const entry = rateLimitBuckets.get(key);

  if (!entry) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitBuckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
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
    remaining: RATE_LIMIT_MAX_REQUESTS - entry.count,
    resetAt: entry.resetAt,
  };
}

export function resetRateLimitForTests() {
  rateLimitBuckets.clear();
}
