import { Schema, model } from 'mongoose';
import { INotification } from './notification.interface';

// --- Schema Definition ---
const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    viewedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

// --- Export Model ---
export const Notification = model<INotification>(
  'Notification',
  notificationSchema,
);
