import { TOtpEmailTemplateParams, TPasswordChangedTemplateParams } from "../app/modules/auth/auth.interface";

export const otpEmailTemplate = ({
  title = 'Your One-Time Password',
  otp,
  expiresMinutes = 5,
  footer = 'PuntaGo Security Team',
  name = 'User',
}: TOtpEmailTemplateParams): string => `
  <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #f9f9fb;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); padding: 40px;">
      <h2 style="color:#000000; font-size: 24px; font-weight:600; margin-bottom:5px;">PuntaGo</h2>
      <p style="color: #6b7280; font-size: 14px; text-align: right;">
      ${new Date()
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    })
    .replace(',', ' at')}
      </p>
      <h2 style="color: #1e293b; margin-bottom: 30px;">${title}</h2>
      <p style="font-size: 16px; color: #111827;">Dear <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #111827; margin-top: 8px;">Here is your One-Time Password to securely access your PuntaGo account:</p>
      <h1 style="font-size: 32px; color: #2563eb; margin: 30px 0; letter-spacing: 4px;">${otp}</h1>
      <p style="color: #4b5563;">Note: This OTP is valid for ${expiresMinutes} minutes.</p>
      <p style="margin-top: 30px; color: #6b7280;">If you did not request this OTP, please disregard this email or contact our support team.</p>
      <p style="margin-top: 40px; color: #1f2937;">Thank you for being part of PuntaGo!</p>
      <p style="margin-top: 10px; color: #6b7280;">${footer}</p>
    </div>
  </div>
`;

export const passwordChangedTemplate = ({
  name = 'User',
  footer = 'PuntaGo Security Team',
}: TPasswordChangedTemplateParams): string => `
  <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #f9f9fb;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); padding: 40px;">
      <h2 style="color:#000000; font-size: 24px; font-weight:600; margin-bottom:5px;">PuntaGo</h2>
      <p style="color: #6b7280; font-size: 14px; text-align: right;">
        ${new Date()
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    })
    .replace(',', ' at')}
      </p>
      <h2 style="color: #1e293b; margin-bottom: 30px;">Password Changed Successfully</h2>
      <p style="font-size: 16px; color: #111827;">Dear <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #111827; margin-top: 8px;">
        We wanted to let you know that your PuntaGo account password has been changed successfully.  
        If you did not make this change, please contact our support team immediately.
      </p>
      <p style="margin-top: 40px; color: #1f2937;">Thank you for being part of PuntaGo!</p>
      <p style="margin-top: 10px; color: #6b7280;">${footer}</p>
    </div>
  </div>
`;