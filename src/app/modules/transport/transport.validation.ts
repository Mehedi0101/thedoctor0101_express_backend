import { z } from 'zod';

// --- Create Transport Schema ---
const createTransportZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    duration: z.string({ required_error: 'Duration is required' }),
    capacity: z.number({ required_error: 'Capacity is required' }),
    price: z.string({ required_error: 'Price is required' }),
    initialPoint: z.string({ required_error: 'Initial point is required' }),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

// --- Update Transport Schema ---
const updateTransportZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    duration: z.string().optional(),
    capacity: z.number().optional(),
    price: z.string().optional(),
    pickup: z.string().optional(),
    destination: z.string().optional(),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

export const TransportValidation = {
  createTransportZodSchema,
  updateTransportZodSchema,
};
