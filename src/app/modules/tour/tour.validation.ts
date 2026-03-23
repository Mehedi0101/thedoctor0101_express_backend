import { z } from 'zod';

// --- Create Tour Schema ---
const createTourZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    location: z.string({ required_error: 'Location is required' }),
    duration: z.string({ required_error: 'Duration is required' }),
    type: z.enum(['group', 'individual'], { required_error: 'Type is required' }),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    frequency: z.string().optional(),
    totalSpot: z.number({ required_error: 'Total spot is required' }),
    availableSpot: z.number({ required_error: 'Available spot is required' }),
    featured: z.boolean().optional(),
    includedItems: z.array(z.string()).optional(),
  }),
});

// --- Update Tour Schema ---
const updateTourZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    duration: z.string().optional(),
    type: z.enum(['group', 'individual']).optional(),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    frequency: z.string().optional(),
    totalSpot: z.number().optional(),
    availableSpot: z.number().optional(),
    featured: z.boolean().optional(),
    includedItems: z.array(z.string()).optional(),
  }),
});

export const TourValidation = {
  createTourZodSchema,
  updateTourZodSchema,
};
