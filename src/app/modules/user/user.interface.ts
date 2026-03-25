import { Model } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  gender?: 'male' | 'female';
  notificationSettings: {
    pushNotification: boolean;
  };
  isDeleted: boolean;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isUserExistsById(id: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
