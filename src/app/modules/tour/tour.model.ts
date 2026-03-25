import { Schema, model } from 'mongoose';
import { TOUR_TYPE } from './tour.constant';
import { TTour } from './tour.interface';

const tourSchema = new Schema<TTour>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TOUR_TYPE),
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    totalSpot: {
      type: Number,
      required: true,
    },
    availableSpot: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    includedItems: {
      type: [String],
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

// Filter out deleted tours
tourSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

tourSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Tour = model<TTour>('Tour', tourSchema);
