import { Schema, model } from 'mongoose';
import { ITour } from './tour.interface';

// --- Schema Definition ---
const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    type: {
      type: String,
      enum: ['group', 'individual'],
      required: true,
    },
    images: [{ type: String }],
    features: [{ type: String }],
    frequency: { type: String },
    totalSpot: { type: Number, required: true },
    availableSpot: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    includedItems: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// --- Middlewares ---
// Filter out deleted tours by default
tourSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// --- Export Model ---
export const Tour = model<ITour>('Tour', tourSchema);
