import { Schema, model } from 'mongoose';
import { BOOKING_STATUS, PAYMENT_STATUS, TRIP_CATEGORY, TRIP_TYPE } from './booking.constant';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
    transportId: {
      type: Schema.Types.ObjectId,
      ref: 'Transport',
    },
    tripType: {
      category: {
        type: String,
        enum: Object.values(TRIP_CATEGORY),
        required: true,
      },
      type: {
        type: String,
        enum: Object.values(TRIP_TYPE),
      },
    },
    locations: {
      pickup: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
    },
    totalPassengers: {
      type: Number,
      required: true,
    },
    flightDetails: {
      arrivalDate: {
        type: String,
      },
      arrivalFlightNumber: {
        type: String,
      },
    },
    passengerDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
    },
    status: {
      booking: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING,
      },
      payment: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.PENDING,
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

// Filter out deleted bookings
bookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Booking = model<TBooking>('Booking', bookingSchema);
