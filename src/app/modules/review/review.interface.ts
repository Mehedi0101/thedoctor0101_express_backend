import { Types } from 'mongoose';

// --- Review Interface ---
export type IReview = {
  user: Types.ObjectId;
  serviceType: 'Tour' | 'Transport';
  serviceId: Types.ObjectId;
  rating: number;
  comment: string;
};
