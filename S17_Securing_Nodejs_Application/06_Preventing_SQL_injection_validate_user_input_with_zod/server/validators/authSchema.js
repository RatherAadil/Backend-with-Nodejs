import * as z from 'zod';

// Register Validation
export const registerSchema = z.object({
  name: z.string().min(3, 'Name should be at least 3 character long.').max(100),
  email: z.email('Enter a valid email address'),
  password: z.string().min(4, 'Password must be atleast 4 characters'),
  otp: z
    .string()
    .length(4, 'OTP must be exactly 4 digits')
    .regex(/^\d{4}$/, 'OTP must contain only digits'),
});

// Login Validation
export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(4, 'Password must be atleast 4 characters'),
  otp: z
    .string()
    .length(4, 'OTP must be exactly 4 digits')
    .regex(/^\d{4}$/, 'Please enter a valid 4 digit OTP string'),
});

// OTP validation

export const otpSchema = z.object({
  email: z.email('Enter a valid email address'),
});

// Verify OTP Validation
export const verifyOTPSchema = z.object({
  email: z.email('Provide a valid email'),
  otp: z
    .string("Enter a valid OTP string")
    .length(4, 'OTP must be exactly 4 digits')
    .regex(/^\d{4}$/, 'OTP must contain only digits'),
});
