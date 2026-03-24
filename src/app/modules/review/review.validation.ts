import { z } from 'zod';

// --- Create Review Schema ---
const createReviewZodSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User ID is required' }),
    serviceType: z.enum(['Tour', 'Transport'], {
      required_error: 'Service type is required',
    }),
    serviceId: z.string({ required_error: 'Service ID is required' }),
    rating: z
      .number({ required_error: 'Rating is required' })
      .min(1)
      .max(5),
    comment: z.string({ required_error: 'Comment is required' }),
  }),
});

// --- Update Review Schema ---
const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
