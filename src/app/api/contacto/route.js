import { NextResponse } from "next/server";
import {
  Transporter,
  mailOptionsClient,
  mailOptionsCorporate,
  corporateContactEmail,
  clientContactEmail,
} from "./_lib/contact-mailer";
import {
  attachmentContentType,
  checkAttachments,
} from "./_lib/contact-attachment-validation";
import { validateContactPayload } from "./_lib/contact-dto";
import { checkRateLimit, getClientIp } from "../_lib/rate-limit";
import { errorResponse, successResponse } from "../_lib/response";
import {
  sanitizeFilename,
  sanitizeHeader,
  sanitizeText,
} from "./_lib/contact-sanitization";

/**
 * POST /api/contacto — the site's single inbound HTTP entry point.
 *
 * Pipeline (all steps BE-side): rate limit (per client IP) → payload
 * validation (yup contract) → attachment checks (count, size, MIME and
 * magic-byte signature) → two emails via the SMTP transport (corporate
 * copy + customer auto-reply) → `{ ok: true }`.
 *
 * Every failure returns a structured JSON error descriptor
 * (`{ code, message, field? }`) with the matching HTTP status (400/413/415/
 * 429/500) so the form layer can toast a specific, Spanish-language reason.
 *
 * @param {Request} req Incoming POST request (JSON body, see the contract in `_lib/contact-dto.js`).
 * @returns {Promise<Response>} JSON response (`NextResponse`) described above.
 */
export async function POST(req) {
  // 1. Identify the caller (client IP from proxy headers) and apply the
  //    5/10min rate limit — rejections carry a `Retry-After` header. The
  //    key is namespaced with the route scope so every endpoint owns its
  //    own bucket in the shared limiter.
  const ip = getClientIp(req.headers);
  const limit = checkRateLimit(`contacto:${ip}`);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        response: "error",
        status: 429,
        error: "Demasiadas solicitudes, intente más tarde",
        code: "RATE_LIMITED",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // 2. Parse the JSON body defensively (non-JSON bodies get a 400).
  let data;

  try {
    data = await req.json();
  } catch {
    return errorResponse(
      400,
      "INVALID_JSON",
      "Cuerpo de la solicitud inválido",
    );
  }

  // 3. Validate the request against the yup DTO contract (`contact-dto.js`).
  const validation = await validateContactPayload(data);

  if (!validation.ok) {
    return errorResponse(
      400,
      "VALIDATION_ERROR",
      validation.message,
      validation.field,
    );
  }

  // 4. Validate the attachment list (count/size/MIME/magic-byte signatures —
  //    `contact-attachment-validation.js`).
  const attachmentsCheck = await checkAttachments(data.adjuntos);

  if (!attachmentsCheck.ok) {
    return errorResponse(
      attachmentsCheck.status,
      attachmentsCheck.code,
      attachmentsCheck.message,
      attachmentsCheck.field,
    );
  }

  // 5. Sanitize every field that lands in an email template (headers get
  //    newline-collapsed, body text gets control chars stripped).
  const cuerpo = {
    correo: sanitizeHeader(data.cuerpo.correo),
    tipo: sanitizeHeader(data.cuerpo.tipo),
    peticion: sanitizeText(data.cuerpo.peticion),
    fecha: sanitizeHeader(data.cuerpo.fecha),
  };

  const asunto = sanitizeHeader(data.asunto);

  // 6. Shape the Nodemailer attachments (sanitized filename + server-side
  //    MIME guess per extension).
  const attachments = Array.isArray(data.adjuntos)
    ? data.adjuntos.map((adjunto) => ({
        filename: sanitizeFilename(adjunto.filename),
        content: adjunto.content,
        encoding: "base64",
        contentType: attachmentContentType(adjunto.filename),
      }))
    : null;

  // 7. Send both emails through the SMTP transport — corporate copy first,
  //    then the customer auto-reply; any failure surfaces as a 502.
  try {
    var mailOptionsCorporate = mailOptionsCorporate();
    var mailOptionsClient = mailOptionsClient(cuerpo.correo);

    const corporateContent = corporateContactEmail({ cuerpo });
    const clientContent = clientContactEmail({ cuerpo });

    //Se envía correo a la empresa
    await Transporter.sendMail({
      ...mailOptionsCorporate,
      ...corporateContent,
      ...(attachments && { attachments }),
      subject: asunto,
    });

    //Se envía correo al cliente
    await Transporter.sendMail({
      ...mailOptionsClient,
      ...clientContent,
      subject: "A&M Dynamic Tools S.A. | Contacto",
    });

    return successResponse(200);
  } catch (error) {
    console.error(
      "contacto: fallo al enviar el correo",
      error?.message ?? error,
    );
    return errorResponse(
      502,
      "SEND_FAILED",
      "No se pudo enviar la solicitud, intente más tarde",
    );
  }
}
