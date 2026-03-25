import { Schema, model } from 'mongoose';
import { TNotification } from './notification.interface';

const notificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    viewedBy: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
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

// Filter out deleted notifications
notificationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

notificationSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Notification = model<TNotification>('Notification', notificationSchema);
