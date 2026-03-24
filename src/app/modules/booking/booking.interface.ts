import { Types } from 'mongoose';

// --- Booking Interface ---
export type IBooking = {
  userId: Types.ObjectId;
  tourId?: Types.ObjectId;
  transportId?: Types.ObjectId;
  tripType: {
    category: 'one_way' | 'round_trip';
    type?: 'arrival' | 'departure';
  };
  locations: {
    pickup: string;
    dropoff: string;
  };
  totalPassengers: number;
  flightDetails?: {
    arrivalDate: string; // ISO string for simplicity in interface
    arrivalFlightNumber: string;
  };
  passengerDetails: {
    name: string;
    email: string;
    contact: string;
  };
  status: {
    booking: 'pending' | 'completed' | 'cancelled';
    payment: 'pending' | 'completed' | 'cancelled';
  };
  isDeleted: boolean;
};
