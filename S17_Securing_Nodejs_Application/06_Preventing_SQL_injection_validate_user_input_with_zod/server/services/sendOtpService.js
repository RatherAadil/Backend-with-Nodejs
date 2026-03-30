import { Resend } from 'resend';
import OTP from '../models/otpModel.js';

const resend = new Resend(process.env.RESEND_API);

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
