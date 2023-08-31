import { NextResponse } from "next/server";
import { Transporter, mailOptionsClliente, mailOptionsCorporativo } from "@/config/nodemailer";

const generarContenidoCorporativo = async ({cuerpo}) => {

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
          <td>${cuerpo.correo}</td>
        </tr>
        <tr>
          <td>Tipo</td>
          <td>${cuerpo.tipo}</td> 
        </tr>
        <tr>
          <td>Petición</td>
          <td>${cuerpo.peticion}</td>
        </tr>
        <tr>
          <td>Fecha</td>
          <td>${cuerpo.fecha}</td>
        </tr>
      </table>
      
    </body>
    </html>`

    return {
        text: `Detalles de la petición:\n\nCorreo del Cliente: ${cuerpo.correo}\n\nTipo: ${cuerpo.tipo}\n\nPetición: ${cuerpo.peticion}\n\nFecha: ${cuerpo.fecha}`,
        html,
    }
}

const generarContenidoCliente = async ({cuerpo}) => {
    
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
          <li>Correo: <strong>${cuerpo.correo}</strong></li> 
          <li>Tipo de petición: <strong>${cuerpo.tipo}</strong></li>
          <li>Petición: <strong>${cuerpo.peticion}</strong></li>
        </ul>
    
        <p>Estamos procesando su solicitud y nos pondremos en contacto pronto.</p>
    
      </main>
    
      <footer>
        <p>&copy; 2023 A&M Dynamic Tools S.A.</p>
      </footer>
    
    </body>
    </html>`

    return {
        text: `Estimado/a Cliente\nRecibimos su petición con los siguientes detalles:\n\nCorreo: ${cuerpo.correo}\nTipo de petición: ${cuerpo.tipo}\nPetición: ${cuerpo.peticion}\n\nEstamos procesando su solicitud y nos pondremos en contacto pronto\n\n© 2023 A&M Dynamic Tools S.A.`,
        html,
    }
}

export async function POST (req) {

    var data = await req.json();
    var MailOptionsCorporativo = mailOptionsCorporativo();
    var MailOptionsCliente = mailOptionsClliente(data.cuerpo.correo);

    try {

        const ContenidoCorporativo = await generarContenidoCorporativo(data);
        const ContenidoCliente = await generarContenidoCliente(data);

        var attachments = data.adjuntos ? data.adjuntos : null;

        //Se envía correo a la empresa
        await Transporter.sendMail({
            ...MailOptionsCorporativo,
            ...ContenidoCorporativo,
            ...(attachments && {attachments}),
            subject: data.asunto,
        });

        //Se envía correo al cliente
        await Transporter.sendMail({
            ...MailOptionsCliente,
            ...ContenidoCliente,
            subject: "A&M Dynamic Tools S.A. | Contacto",
        });

        return NextResponse.json(
            {response: 'success', status: 200},
            {status: 200}
        );

    }
    catch (error) {
        console.log(error);
        return NextResponse.json(
            {response: 'error', status: 400},
            {status: 400}
        );
    }
}