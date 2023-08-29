const nodemailer = require("nodemailer");

const user = process.env.USER;
const pass = process.env.PASS;

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass,
    }
});

export const mailOptionsCorporativo = (correosEnvio) => {
    return {
        from: correosEnvio[0].detalle,
        to: correosEnvio[0].detalle,
        cc: correosEnvio.slice(1).map(correo => {
            return correo.detalle;
        }).join()
    }
}

export const mailOptionsClliente = (correosEnvio, correoCliente) => {
    return {
        from: correosEnvio[0].detalle,
        to: correoCliente
    }
}