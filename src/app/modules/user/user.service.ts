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

export const UserServices = {
  getMe,
};
