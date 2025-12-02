import crypto from "crypto";
import {transporter} from '../utils/email.js'
async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"ResOps App" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    text: `Your verification code is: ${otp}. It expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}



function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}
export {sendOtpEmail , generateOtp}