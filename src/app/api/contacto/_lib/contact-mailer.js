import "server-only";

const nodemailer = require("nodemailer");

import { escapeHtml, escapeHtmlMultiline } from "./contact-sanitization";

/**
 * Contact mailer service: the SMTP transport (credentials via env), the
 * two request envelopes (corporate copy + customer auto-reply) and the
 * email templates (HTML + plain-text bodies for both).
 *
 * BE-only (guarded) — holds mail credentials/env access; imported
 * exclusively by `../route.js`. Transport timeouts are aggressive on
 * purpose: mail sending must never hang the request for more than ~10s
 * (the route returns a server error and the form shows a toast). Template
 * fields arrive pre-sanitized from the controller; the HTML interpolations
 * still escape (`escapeHtml`/`escapeHtmlMultiline`) so the bodies are safe
 * regardless.
 */
export const Transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

/**
 * Envelope for the internal corporate copy of each contact request
 * (from = same mailbox, to/cc hardcoded — see the AGENTS Environment note
 * about `CONTACT_*` placeholders being unused today).
 *
 * @returns {Object} Nodemailer envelope subset `{ from, to, cc }`.
 */
export const mailOptionsCorporate = () => {
  return {
    from: "dynamictoolscr@gmail.com",
    to: "dynamictoolscr@gmail.com",
    cc: "jalfarodynamictools@gmail.com",
  };
};

/**
 * Envelope for the customer auto-reply email (the client address is the
 * sanitized reply-to of the request).
 *
 * @param {string} customerEmail Request body `cuerpo.correo` (already validated + sanitized).
 * @returns {Object} Nodemailer envelope subset `{ from, to }`.
 */
export const mailOptionsClient = (customerEmail) => {
  return {
    from: "dynamictoolscr@gmail.com",
    to: customerEmail,
  };
};

/**
 * Builds the corporate-copy email body: a detail table of the client's
 * request (HTML) plus its plain-text fallback. Every interpolated field is
 * HTML-escaped server-side.
 *
 * @param {Object} params Template params.
 * @param {Object} params.cuerpo Sanitized request fields `{ correo, tipo, peticion, fecha }`.
 * @returns {{text: string, html: string}} Nodemailer content pair.
 */
export const corporateContactEmail = ({ cuerpo }) => {
  const html = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }

        h1, h2 {
          color: #333;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #ddd;
          padding: 8px;
          white-space: pre-wrap;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h1>Detalles de la petición</h1>
      <table>
        <tr>
          <td>Correo del cliente</td>
          <td>${escapeHtml(cuerpo.correo)}</td>
        </tr>
        <tr>
          <td>Tipo</td>
          <td>${escapeHtml(cuerpo.tipo)}</td>
        </tr>
        <tr>
          <td>Petición</td>
          <td>${escapeHtmlMultiline(cuerpo.peticion)}</td>
        </tr>
        <tr>
          <td>Fecha</td>
          <td>${escapeHtml(cuerpo.fecha)}</td>
        </tr>
      </table>
    </body>
    </html>`;

  return {
    text: `Detalles de la petición:\n\nCorreo del Cliente: ${cuerpo.correo}\n\nTipo: ${cuerpo.tipo}\n\nPetición: ${cuerpo.peticion}\n\nFecha: ${cuerpo.fecha}`,
    html,
  };
};

/**
 * Builds the customer auto-reply email body: a thank-you summary of the
 * request (HTML) plus its plain-text fallback. Every interpolated field is
 * HTML-escaped server-side.
 *
 * @param {Object} params Template params.
 * @param {Object} params.cuerpo Sanitized request fields `{ correo, tipo, peticion, fecha }`.
 * @returns {{text: string, html: string}} Nodemailer content pair.
 */
export const clientContactEmail = ({ cuerpo }) => {
  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Confirmación de petición</title>
      <style>
      </style>
    </head>
    <body>
      <header>
        <h1>Gracias por su petición!</h1>
      </header>
      <main>
        <p>Estimado/a Cliente</p>
        <p>Recibimos su petición con los siguientes detalles:</p>
        <ul>
          <li>Correo: <strong>${escapeHtml(cuerpo.correo)}</strong></li>
          <li>Tipo de petición: <strong>${escapeHtml(cuerpo.tipo)}</strong></li>
          <li>Petición: <strong>${escapeHtmlMultiline(cuerpo.peticion)}</strong></li>
        </ul>
        <p>Estamos procesando su solicitud y nos pondremos en contacto pronto.</p>
      </main>
      <footer>
        <p>&copy; 2023 A&M Dynamic Tools S.A.</p>
      </footer>
    </body>
    </html>`;

  return {
    text: `Estimado/a Cliente\nRecibimos su petición con los siguientes detalles:\n\nCorreo: ${cuerpo.correo}\nTipo de petición: ${cuerpo.tipo}\nPetición: ${cuerpo.peticion}\n\nEstamos procesando su solicitud y nos pondremos en contacto pronto\n\n© 2023 A&M Dynamic Tools S.A.`,
    html,
  };
};
