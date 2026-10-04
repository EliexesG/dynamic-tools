const nodemailer = require("nodemailer");

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

export const Transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || "gmail",
  auth: {
    user,
    pass,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

export const mailOptionsCorporativo = () => {
  return {
    from: "dynamictoolscr@gmail.com",
    to: "dynamictoolscr@gmail.com",
    cc: "jalfarodynamictools@gmail.com",
  };
};

export const mailOptionsClliente = (correoCliente) => {
  return {
    from: "dynamictoolscr@gmail.com",
    to: correoCliente,
  };
};
