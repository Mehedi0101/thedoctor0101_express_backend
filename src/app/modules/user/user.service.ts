import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import ApiError from '../../errors/ApiError';

/**
 * Creates a base user in the database.
 * This is a shared utility used during registration.
 */
const createBaseUser = async (payload: Partial<IUser>) => {
  // Check if user already exists
  const isUserExists = await User.findOne({ email: payload.email });

  if (isUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists!');
  }

  // Hash password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  // Create user
  const newUser = await User.create([payload]);

  if (!newUser.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return newUser[0];
};

export const UserService = {
  createBaseUser,
};
