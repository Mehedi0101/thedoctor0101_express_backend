import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';

/**
 * @function getMe
 * @description Retrieves the current user's profile.
 * Only selects name, email, role, and gender, explicitly excluding details like password or _id.
 * @param {string} email - The email of the currently authenticated user.
 * @returns {Promise<any>} The securely selected user profile data.
 */
const getMe = async (email: string) => {
  const user = await User.findOne({ email }).select('name email role gender image');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return user;
};

/**
 * @function changePassword
 * @description Changes the user's password securely by verifying the old password first.
 * @param {string} email - The email of the currently authenticated user.
 * @param {any} payload - The oldPassword and newPassword provided by the client.
 * @returns {Promise<null>}
 */
const changePassword = async (email: string, payload: any) => {
  const { oldPassword, newPassword } = payload;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const isPasswordMatched = await User.isPasswordMatched(oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect old password!');
  }

  user.password = newPassword;
  await user.save();

  return null;
};

export const UserServices = {
  getMe,
  changePassword,
};
