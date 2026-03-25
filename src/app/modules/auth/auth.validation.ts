import { z } from 'zod';

// --- Register Validation Schema ---
const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

// --- Login Validation Schema ---
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// --- Forgot Password Validation Schema ---
const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

// --- Verify OTP Validation Schema ---
const verifyOtpValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    otp: z.string({ required_error: 'OTP is required' }).length(6, 'OTP must be 6 digits'),
  }),
});

// --- Reset Password Validation Schema ---
const resetPasswordValidationSchema = z.object({
  body: z.object({
    resetToken: z.string({ required_error: 'Reset token is required' }),
    newPassword: z.string({ required_error: 'New password is required' }).min(6, 'Password must be at least 6 characters'),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  forgotPasswordValidationSchema,
  verifyOtpValidationSchema,
  resetPasswordValidationSchema,
};
