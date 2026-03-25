import { Types } from 'mongoose';

export type TSupport = {
  userId: Types.ObjectId;
  title: string;
  email: string;
  message: string;
  isDeleted: boolean;
};
