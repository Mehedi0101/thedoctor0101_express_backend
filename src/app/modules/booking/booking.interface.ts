import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  tourId?: Types.ObjectId;
  transportId?: Types.ObjectId;
  tripType: {
    category: 'one_way' | 'round_trip';
    type?: 'arrival' | 'departure';
  };
  locations: {
    pickup: string;
    destination: string;
  };
  totalPassengers: number;
  flightDetails?: {
    arrivalDate: string;
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
