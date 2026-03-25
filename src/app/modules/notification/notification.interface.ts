import { Types } from 'mongoose';

export type TNotification = {
  title: string;
  message: string;
  viewedBy: Types.ObjectId[];
  isDeleted: boolean;
};
