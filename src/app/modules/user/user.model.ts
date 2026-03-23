import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

// --- Schema Definition ---
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    notifications: {
      pushNotification: {
        type: Boolean,
        default: false,
      },
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

// --- Middlewares ---
// Filter out deleted users by default
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// --- Export Model ---
export const User = model<IUser, UserModel>('User', userSchema);
