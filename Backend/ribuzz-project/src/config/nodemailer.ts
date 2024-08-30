const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "pfgrupo2ft51@gmail.com",
    pass: "aafl xwxv wfsv bjug",
  },
});
