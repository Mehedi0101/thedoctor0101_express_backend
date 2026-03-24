// --- Password Reset Interface ---
export type IPasswordReset = {
  email: string;
  otp: string; // Hashed OTP
  resetToken?: string; // Issued after OTP verification
  isVerified: boolean; // True if OTP is verified
  expiresAt: Date;
};
