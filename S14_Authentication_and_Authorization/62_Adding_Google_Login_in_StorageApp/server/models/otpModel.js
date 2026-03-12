import { model, Schema } from 'mongoose';
const otpSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  {
    strict: 'throw',
  },
);

const OTP = model('OTP', otpSchema);
export default OTP;
