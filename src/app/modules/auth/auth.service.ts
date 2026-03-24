import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';

/**
 * Registers a new user.
 */
const registerUser = async (payload: IUser) => {
  // Ensure the role is always 'user' for public registration
  const userPayload = { ...payload, role: 'user' as const };
  const newUser = await UserService.createBaseUser(userPayload);
  return newUser;
};

export const AuthService = {
  registerUser,
};
