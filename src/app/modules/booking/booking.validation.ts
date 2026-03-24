import { z } from 'zod';

// --- Create Booking Schema ---
const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    tourId: z.string().optional(),
    transportId: z.string().optional(),
    tripType: z.object({
      category: z.enum(['one_way', 'round_trip'], {
        required_error: 'Trip category is required',
      }),
      type: z.enum(['arrival', 'departure']).optional(),
    }),
    locations: z.object({
      pickup: z.string({ required_error: 'Pickup location is required' }),
      dropoff: z.string({ required_error: 'Dropoff location is required' }),
    }),
    totalPassengers: z.number({ required_error: 'Total passengers is required' }),
    flightDetails: z
      .object({
        arrivalDate: z.string().optional(),
        arrivalFlightNumber: z.string().optional(),
      })
      .optional(),
    passengerDetails: z.object({
      name: z.string({ required_error: 'Passenger name is required' }),
      email: z.string({ required_error: 'Passenger email is required' }).email(),
      contact: z.string({ required_error: 'Passenger contact is required' }),
    }),
    status: z
      .object({
        booking: z.enum(['pending', 'completed', 'cancelled']).optional(),
        payment: z.enum(['pending', 'completed', 'cancelled']).optional(),
      })
      .optional(),
  }),
});

// --- Update Booking Schema ---
const updateBookingZodSchema = z.object({
  body: z.object({
    tripType: z
      .object({
        category: z.enum(['one_way', 'round_trip']).optional(),
        type: z.enum(['arrival', 'departure']).optional(),
      })
      .optional(),
    locations: z
      .object({
        pickup: z.string().optional(),
        dropoff: z.string().optional(),
      })
      .optional(),
    totalPassengers: z.number().optional(),
    flightDetails: z
      .object({
        arrivalDate: z.string().optional(),
        arrivalFlightNumber: z.string().optional(),
      })
      .optional(),
    passengerDetails: z
      .object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        contact: z.string().optional(),
      })
      .optional(),
    status: z
      .object({
        booking: z.enum(['pending', 'completed', 'cancelled']).optional(),
        payment: z.enum(['pending', 'completed', 'cancelled']).optional(),
      })
      .optional(),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
