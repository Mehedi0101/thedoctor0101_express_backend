import nodemailer, { SentMessageInfo } from 'nodemailer';
import { NextFunction } from 'express';
import config from '../config';

export type TEmailHelperParams = {
  to: string | string[];
  subject: string;
  message?: string;
  html?: string;
  next?: NextFunction;
};

export const emailHelper = async ({ to, subject, message, html, next }: TEmailHelperParams): Promise<SentMessageInfo | void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"TheDoctor0101" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text: message || '',
      html: html || '',
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    if (next) return next(err as Error);
  }
};
