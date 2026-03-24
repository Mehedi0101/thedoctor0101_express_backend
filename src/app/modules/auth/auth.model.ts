import { Schema, model } from 'mongoose';
import { IPasswordReset } from './auth.interface';

// --- Schema Definition ---
const passwordResetSchema = new Schema<IPasswordReset>(
  {
    email: {
      type: String,
      required: true,
      ref: 'User',
    },
    otp: {
      type: String, // Stores hashed OTP
      required: true,
    },
    resetToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-delete expires tokens using MongoDB TTL index
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// --- Export Model ---
export const PasswordReset = model<IPasswordReset>(
  'PasswordReset',
  passwordResetSchema,
);
