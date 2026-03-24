import { z } from 'zod';

// --- Forget Password Schema ---
const forgetPasswordZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
  }),
});

// --- Verify OTP Schema ---
const verifyOtpZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    otp: z.string({ required_error: 'OTP is required' }),
  }),
});

// --- Reset Password Schema ---
const resetPasswordZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    resetToken: z.string({ required_error: 'Reset token is required' }),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

export const AuthValidation = {
  forgetPasswordZodSchema,
  verifyOtpZodSchema,
  resetPasswordZodSchema,
};
