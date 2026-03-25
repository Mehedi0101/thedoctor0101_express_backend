import { Types } from 'mongoose';

export type TReview = {
  user: Types.ObjectId;
  serviceType: 'Tour' | 'Transport';
  serviceId: Types.ObjectId;
  rating: number;
  comment: string;
  isDeleted: boolean;
};
