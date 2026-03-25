export const BOOKING_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const TRIP_CATEGORY = {
  ONE_WAY: 'one_way',
  ROUND_TRIP: 'round_trip',
} as const;

export const TRIP_TYPE = {
  ARRIVAL: 'arrival',
  DEPARTURE: 'departure',
} as const;

export const BookingSearchableFields = ['passengerDetails.name', 'passengerDetails.email', 'locations.pickup', 'locations.destination'];
