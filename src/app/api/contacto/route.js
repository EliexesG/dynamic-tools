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
        text: `Correo del Cliente: ${cuerpo.correo}\n\nTipo: ${cuerpo.tipo}\n\nPetición: ${cuerpo.peticion}\n\nFecha: ${cuerpo.fecha}`,
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
        </ul>
    
        <p>Estamos procesando su solicitud y nos pondremos en contacto pronto.</p>
    
      </main>
    
      <footer>
        <p>&copy; 2023 A&M Dynamic Tools S.A.</p>
      </footer>
    
    </body>
    </html>`

    return {
        text: `Correo del Cliente: ${cuerpo.correo}\n\nTipo: ${cuerpo.tipo}\n\nPetición: ${cuerpo.peticion}\n\nFecha: ${cuerpo.fecha}`,
        html,
    }
}

export async function POST (req) {

    var data = await req.json();
    var MailOptionsCorporativo = mailOptionsCorporativo(data.correosEnvio);
    var MailOptionsCliente = mailOptionsClliente(data.correosEnvio, data.cuerpo.correo);

    try {

        const ContenidoCorporativo = await generarContenidoCorporativo(data);
        const ContenidoCliente = await generarContenidoCliente(data);

        //Se envía correo a la empresa
        await Transporter.sendMail({
            ...MailOptionsCorporativo,
            ...ContenidoCorporativo,
            subject: data.asunto,
        });

        //Se envía correo al cliente
        await Transporter.sendMail({
            ...MailOptionsCliente,
            ...ContenidoCliente,
            subject: data.asunto,
        });

        return NextResponse.json(
            {response: 'success'},
            {status: 200}
        );

    }
    catch (error) {
        console.log(error);
        return NextResponse.json(
            {response: 'error'},
            {status: 400}
        );
    }
}