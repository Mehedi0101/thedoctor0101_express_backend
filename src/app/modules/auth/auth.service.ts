import bcrypt from 'bcrypt';
import crypto from 'crypto';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { generateOTP } from '../../utils/authHelper';
import { getOTPExpiryDate } from '../../utils/dateHelper';
import { emailHelper } from '../../utils/emailHelper';
import { createToken } from '../../utils/verifyJWT';
import { otpEmailTemplate, passwordChangedTemplate } from '../../../views/email.views';

import { USER_ROLE } from '../user/user.constant';
import { User } from '../user/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { PasswordReset } from './auth.model';

/**
 * Registers a new user.
 */
const registerUser = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'This user already exists!');
  }

  const userPayload = {
    ...payload,
    role: USER_ROLE.USER,
  };

  const newUser = await User.create(userPayload);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    newUser,
  };
};

/**
 * Logs in a user.
 */
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password!');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password!');
  }

  // create token and send to the client
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    user,
  };
};

/**
 * Forgot password logic: generates OTP, hashes it, and saves it to the database.
 */
const forgotPassword = async (email: string) => {
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Generate a random 6-digit OTP
  const otp = generateOTP();

  // Hash the OTP before saving to database
  const hashedOtp = await bcrypt.hash(otp, Number(config.bcrypt_salt_rounds));

  // Set expiration time (e.g., 5 minutes from now)
  const expiresAt = getOTPExpiryDate(5);

  // Save or update the OTP in the PasswordReset collection
  await PasswordReset.findOneAndUpdate(
    { email },
    {
      email,
      otp: hashedOtp,
      expiresAt,
      isVerified: false,
    },
    { upsert: true, new: true },
  );

  const emailHtmlContent = otpEmailTemplate({
    otp,
    name: user.name,
    expiresMinutes: 5,
  });

  await emailHelper({
    to: user.email,
    subject: 'Your Password Reset OTP',
    html: emailHtmlContent,
  });

  return null;
};

/**
 * Verifies the OTP and generates a reset token.
 */
const verifyOtp = async (payload: { email: string; otp: string }) => {
  const { email, otp } = payload;
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Find the OTP document
  const resetDocument = await PasswordReset.findOne({ email });

  if (!resetDocument) {
    throw new AppError(httpStatus.NOT_FOUND, 'No active OTP found for this email!');
  }

  if (resetDocument.expiresAt < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'OTP has expired!');
  }

  const isOtpValid = await bcrypt.compare(otp, resetDocument.otp);

  if (!isOtpValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid OTP!');
  }

  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Mark as verified, save the reset token, and extend expiresAt by 10 minutes
  resetDocument.isVerified = true;
  resetDocument.resetToken = resetToken;
  resetDocument.expiresAt = getOTPExpiryDate(10);
  await resetDocument.save();

  return { resetToken };
};

/**
 * Resets the user's password using the reset token.
 */
const resetPassword = async (payload: { resetToken: string; newPassword: string }) => {
  const { resetToken, newPassword } = payload;

  const resetDocument = await PasswordReset.findOne({
    resetToken,
    isVerified: true,
  });

  if (!resetDocument) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid or expired reset token!');
  }

  if (resetDocument.expiresAt < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Reset token has expired!');
  }

  const user = await User.findOne({ email: resetDocument.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Update password (Mongoose pre-save hook will hash it)
  user.password = newPassword;
  await user.save();

  // Delete the reset document so it can't be used again
  await PasswordReset.deleteOne({ _id: resetDocument._id });

  // Send success email
  const emailHtmlContent = passwordChangedTemplate({
    name: user.name,
  });

  await emailHelper({
    to: user.email,
    subject: 'Password Changed Successfully',
    html: emailHtmlContent,
  });

  return null;
};

export const AuthServices = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
