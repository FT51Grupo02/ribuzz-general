const nodemailer = require("nodemailer");
import {config as dotenvconfig} from 'dotenv'

dotenvconfig({ path: '.env'});

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "pfgrupo2ft51@gmail.com",
    pass: process.env.NODEMAIL_PASS,
  },
});
