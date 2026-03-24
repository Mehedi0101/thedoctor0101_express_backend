import { z } from 'zod';

// --- Create Blog Schema ---
const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    image: z.string({ required_error: 'Image URL is required' }),
  }),
});

// --- Update Blog Schema ---
const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
