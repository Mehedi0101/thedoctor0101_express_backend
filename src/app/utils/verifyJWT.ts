import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { USER_ROLE } from '../modules/user/user.constant';

export const createToken = (
  jwtPayload: {
    _id?: any;
    name: string;
    email: string;
    role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};
