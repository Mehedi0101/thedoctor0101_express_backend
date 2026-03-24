import { Types } from 'mongoose';

// --- Notification Interface ---
export type INotification = {
  title: string;
  message: string;
  viewedBy: Types.ObjectId[]; // List of users who have seen the notification
};
