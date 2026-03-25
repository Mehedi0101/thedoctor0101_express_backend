import { Schema, model } from 'mongoose';
import { TSupport } from './support.interface';

const supportSchema = new Schema<TSupport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
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

// Filter out deleted support tickets
supportSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

supportSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Support = model<TSupport>('Support', supportSchema);
