import OTP from '../models/otpModel.js';

export const validateOTP = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    return false;
  }
  await otpRecord.deleteOne();
  return true;
};
