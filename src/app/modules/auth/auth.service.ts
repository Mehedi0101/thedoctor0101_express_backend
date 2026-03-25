import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/verifyJWT';
import { USER_ROLE } from '../user/user.constant';
import { User } from '../user/user.model';
import { TRegisterUser } from './auth.interface';

/**
 * Registers a new user.
 */
const registerUser = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user already exists!');
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
    status: newUser.status,
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

export const AuthServices = {
  registerUser,
};
