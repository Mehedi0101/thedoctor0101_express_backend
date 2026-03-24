import { z } from 'zod';

// --- Create User Schema ---
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
    image: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    notifications: z
      .object({
        pushNotification: z.boolean().optional(),
      })
      .optional(),
  }),
});

// --- Update User Schema ---
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    notifications: z
      .object({
        pushNotification: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
