import { Schema, model } from 'mongoose';
import { SERVICE_TYPE } from './review.constant';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceType: {
      type: String,
      enum: Object.values(SERVICE_TYPE),
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      refPath: 'serviceType',
      required: true,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Filter out deleted reviews
reviewSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

reviewSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Review = model<TReview>('Review', reviewSchema);
