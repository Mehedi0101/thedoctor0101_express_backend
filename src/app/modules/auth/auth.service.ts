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
 * @function registerUser
 * @description Registers a new user in the database and generates an initial access token.
 * @param {TRegisterUser} payload - The user registration details (name, email, password).
 * @returns {Promise<{ accessToken: string, newUser: any }>} The generated token and user record.
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
 * @function loginUser
 * @description Authenticates a user by verifying their email and password.
 * @param {TLoginUser} payload - The user login credentials (email, password).
 * @returns {Promise<{ accessToken: string, user: any }>} The generated token and user record.
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
 * @function forgotPassword
 * @description Generates a 6-digit OTP, securely hashes it, saves it to the DB with a 5-minute expiry, and emails the user.
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Promise<null>}
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
 * @function verifyOtp
 * @description Verifies a submitted OTP against the hashed version in the DB, and generates a one-time reset token if valid.
 * @param {Object} payload - Contains the user's email and the 6-digit OTP.
 * @returns {Promise<{ resetToken: string }>} A secure reset token valid for 10 minutes.
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
 * @function resetPassword
 * @description Resets a user's password using a valid reset token, hashes the new password, and sends a confirmation email.
 * @param {Object} payload - Contains the resetToken and the newPassword.
 * @returns {Promise<null>}
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
