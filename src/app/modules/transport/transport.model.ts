import { Schema, model } from 'mongoose';
import { TTransport } from './transport.interface';

const transportSchema = new Schema<TTransport>(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    images: {
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

// Filter out deleted transport
transportSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

transportSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Transport = model<TTransport>('Transport', transportSchema);
