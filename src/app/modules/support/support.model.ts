import { Schema, model } from 'mongoose';
import { ISupport } from './support.interface';

// --- Schema Definition ---
const supportSchema = new Schema<ISupport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// --- Export Model ---
export const Support = model<ISupport>('Support', supportSchema);
