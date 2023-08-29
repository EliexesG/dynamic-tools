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

export const mailOptionsCorporativo = () => {
    return {
        from: 'gympro001mensajes@gmail.com',
        to: 'gympro001mensajes@gmail.com',
        cc: 'eliasgabriel6100@gmail.com',
    }
}

export const mailOptionsClliente = (correoCliente) => {
    return {
        from: 'gympro001mensajes@gmail.com',
        to: correoCliente
    }
}