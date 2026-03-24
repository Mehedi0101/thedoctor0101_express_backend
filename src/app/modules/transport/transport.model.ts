import { Schema, model } from 'mongoose';
import { ITransport } from './transport.interface';

// --- Schema Definition ---
const transportSchema = new Schema<ITransport>(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    features: [{ type: String }],
    images: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// --- Middlewares ---
// Filter out deleted transports by default
transportSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// --- Export Model ---
export const Transport = model<ITransport>('Transport', transportSchema);
