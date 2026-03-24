import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';

// --- Schema Definition ---
const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['Tour', 'Transport'],
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'serviceType', // Polymorphic reference
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// --- Export Model ---
export const Review = model<IReview>('Review', reviewSchema);
