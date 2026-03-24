import { Types } from 'mongoose';

// --- Support Interface ---
export type ISupport = {
  userId: Types.ObjectId;
  title: string;
  email: string;
  message: string;
};
