import { NextResponse } from "next/server";
import {
  Transporter,
  mailOptionsClliente,
  mailOptionsCorporativo,
} from "@/config/nodemailer";
import {
  attachmentContentType,
  checkAttachments,
  checkRateLimit,
  escapeHtml,
  escapeHtmlMultiline,
  getClientIp,
  sanitizeFilename,
  sanitizeHeader,
  sanitizeText,
  validateContactPayload,
} from "@/lib/contacto";

const errorResponse = (status, code, message, field) => {
  return NextResponse.json(
    {
      response: "error",
      status,
      error: message,
      code,
      ...(field ? { field } : {}),
    },
    { status }
  );
};

const generarContenidoCorporativo = ({ cuerpo }) => {
  var html = `<!DOCTYPE html>
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

const generarContenidoCliente = ({ cuerpo }) => {
  var html = `<!DOCTYPE html>
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

export async function POST(req) {
  const ip = getClientIp(req.headers);
  const limit = checkRateLimit(ip);

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
      }
    );
  }

  let data;

  try {
    data = await req.json();
  } catch {
    return errorResponse(400, "INVALID_JSON", "Cuerpo de la solicitud inválido");
  }

  const validation = await validateContactPayload(data);

  if (!validation.ok) {
    return errorResponse(400, "VALIDATION_ERROR", validation.message, validation.field);
  }

  const attachmentsCheck = checkAttachments(data.adjuntos);

  if (!attachmentsCheck.ok) {
    return errorResponse(
      attachmentsCheck.status,
      attachmentsCheck.code,
      attachmentsCheck.message,
      attachmentsCheck.field
    );
  }

  const cuerpo = {
    correo: sanitizeHeader(data.cuerpo.correo),
    tipo: sanitizeHeader(data.cuerpo.tipo),
    peticion: sanitizeText(data.cuerpo.peticion),
    fecha: sanitizeHeader(data.cuerpo.fecha),
  };

  const asunto = sanitizeHeader(data.asunto);

  const attachments = Array.isArray(data.adjuntos)
    ? data.adjuntos.map((adjunto) => ({
        filename: sanitizeFilename(adjunto.filename),
        content: adjunto.content,
        encoding: "base64",
        contentType: attachmentContentType(adjunto.filename),
      }))
    : null;

  try {
    var MailOptionsCorporativo = mailOptionsCorporativo();
    var MailOptionsCliente = mailOptionsClliente(cuerpo.correo);

    const ContenidoCorporativo = generarContenidoCorporativo({ cuerpo });
    const ContenidoCliente = generarContenidoCliente({ cuerpo });

    //Se envía correo a la empresa
    await Transporter.sendMail({
      ...MailOptionsCorporativo,
      ...ContenidoCorporativo,
      ...(attachments && { attachments }),
      subject: asunto,
    });

    //Se envía correo al cliente
    await Transporter.sendMail({
      ...MailOptionsCliente,
      ...ContenidoCliente,
      subject: "A&M Dynamic Tools S.A. | Contacto",
    });

    return NextResponse.json(
      { response: "success", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("contacto: fallo al enviar el correo", error?.message ?? error);
    return errorResponse(
      502,
      "SEND_FAILED",
      "No se pudo enviar la solicitud, intente más tarde"
    );
  }
}
