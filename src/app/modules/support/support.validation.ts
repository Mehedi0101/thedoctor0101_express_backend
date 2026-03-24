import { z } from 'zod';

// --- Create Support Schema ---
const createSupportZodSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    title: z.string({ required_error: 'Title is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    message: z.string({ required_error: 'Message is required' }),
  }),
});

// --- Update Support Schema ---
const updateSupportZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    title: z.string().optional(),
    email: z.string().email().optional(),
    message: z.string().optional(),
  }),
});

export const SupportValidation = {
  createSupportZodSchema,
  updateSupportZodSchema,
};
