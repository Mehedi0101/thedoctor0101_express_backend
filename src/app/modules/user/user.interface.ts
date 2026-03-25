import { Model } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  gender?: 'male' | 'female';
  status: 'active' | 'blocked';
  isVerified: boolean;
  passwordChangedAt?: Date;
  notifications: {
    pushNotification: boolean;
  };
  isDeleted: boolean;
};

export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: number, jwtIssuedTimestamp: number): boolean;
}
