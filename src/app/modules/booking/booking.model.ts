import { Schema, model, Types } from 'mongoose';
import { IBooking } from './booking.interface';

// --- Schema Definition ---
const bookingSchema = new Schema<IBooking>(
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
        enum: ['one_way', 'round_trip'],
        required: true,
      },
      type: {
        type: String,
        enum: ['arrival', 'departure'],
      },
    },
    locations: {
      pickup: { type: String, required: true },
      dropoff: { type: String, required: true },
    },
    totalPassengers: {
      type: Number,
      required: true,
    },
    flightDetails: {
      arrivalDate: { type: String },
      arrivalFlightNumber: { type: String },
    },
    passengerDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      contact: { type: String, required: true },
    },
    status: {
      booking: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
      },
      payment: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
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
// Filter out deleted bookings by default
bookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// --- Export Model ---
export const Booking = model<IBooking>('Booking', bookingSchema);
