import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "achraf.fril@uhp.ac.ma",       // your Gmail address
    pass: "mwwymcuxybuzuskf"    // 16-digit app password
  }
});

export {transporter}