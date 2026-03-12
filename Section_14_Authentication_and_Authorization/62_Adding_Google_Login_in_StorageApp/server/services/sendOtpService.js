import { Resend } from 'resend';
import OTP from '../models/otpModel.js';
const API_KEY = process.env.RESEND_API;

const resend = new Resend(API_KEY);

export async function sendOtpService(email) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await OTP.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true },
  );

  const html = `
    <div style='font-family:serif;text-align:center;'>
    <h2>Your OTP is: ${otp}</h2>
    <p>This OTP is valid for 10 minutes.</p>
    </div>          
  `;

  await resend.emails.send({
    from: 'Storage App <otp@ratheraadil.dev>',
    to: email,
    subject: 'STORAGE APP OTP',
    html,
  });

  return { success: true, message: `OTP sent succesfully on ${email}` };
}
