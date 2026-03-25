export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

// --- Password Reset Interface ---
export type IPasswordReset = {
  email: string;
  otp: string;
  resetToken?: string;
  isVerified: boolean;
  expiresAt: Date;
};

export type TOtpEmailTemplateParams = {
  title?: string;
  otp: string;
  expiresMinutes?: number;
  footer?: string;
  name?: string;
};

export type TPasswordChangedTemplateParams = {
  name?: string;
  footer?: string;
};

