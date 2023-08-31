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
        from: 'dynamictoolscr@gmail.com',
        to: 'dynamictoolscr@gmail.com',
        cc: 'jalfarodynamictools@gmail.com',
    }
}

export const mailOptionsClliente = (correoCliente) => {
    return {
        from: 'dynamictoolscr@gmail.com',
        to: correoCliente
    }
}