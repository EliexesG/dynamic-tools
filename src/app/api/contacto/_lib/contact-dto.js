import "server-only";

import * as yup from "yup";

/**
 * Contact request DTO (Data Transfer Object): the request-body contract of
 * `/api/contacto` — field names, allowed request types and the yup schema
 * that validates them. This is the authoritative shape of what the client
 * may send (validated separately from attachments).
 *
 * BE-only (guarded) — imported by `../route.js`.
 */

/**
 * Whitespace-free request types accepted by the endpoint — must match the
 * select options rendered by the contact form (uppercased Spanish labels as
 * sent by the client).
 */
export const ALLOWED_REQUEST_TYPES = ["Información", "Cotización"];

/**
 * The request-body contract (yup): asunto/no-newlines, nested `cuerpo`
 * payload, optional `nombre`, optional `attachments` (validated separately
 * in `contact-attachment-validation.js`). Field names = the documented API
 * contract.
 */
export const contactSchema = yup.object({
  asunto: yup
    .string()
    .trim()
    .required("Debe indicar un asunto")
    .max(200, "El asunto es demasiado largo")
    .test("no-newlines", "El asunto contiene caracteres inválidos", (value) =>
      value ? !/[\r\n]/.test(value) : true,
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
        .oneOf(ALLOWED_REQUEST_TYPES, "Debe seleccionar el tipo de solicitud"),
      fecha: yup
        .string()
        .trim()
        .required("La fecha es obligatoria")
        .max(100, "La fecha es inválida"),
    })
    .required(),
  nombre: yup
    .string()
    .trim()
    .max(200, "El nombre es demasiado largo")
    .nullable(),
  attachments: yup.array().nullable(),
});

/**
 * Runs the yup contract and translates the abort-early failure into a
 * single-field response (safe shape for the route handler to forward).
 *
 * @param {unknown} data Request body.
 * @returns {Promise<{ok: true, value: Object} | {ok: false, field: string, message: string}>}
 */
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
