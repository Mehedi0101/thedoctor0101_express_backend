import { Model } from 'mongoose';

// --- User Interface ---
export type IUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  image?: string;
  gender?: 'male' | 'female';
  notifications: {
    pushNotification: boolean;
  };
  isDeleted: boolean;
};

// --- User Model Type ---
export type UserModel = Model<IUser, Record<string, never>>;
