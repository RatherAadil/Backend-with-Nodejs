import OTP from '../models/otpModel.js';
import { sendOtpService } from '../services/sendOtpService.js';

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json({ error: 'email not included' });
  }
  const resData = await sendOtpService(email);
  return res.status(201).json(resData);
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(404).json({ error: 'otp not included' });
  }
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return res.status(404).json({ error: 'Invalid OTP or expired OTP' });
  }

  return res.status(200).json({ message: 'OTP Verified' });
};
