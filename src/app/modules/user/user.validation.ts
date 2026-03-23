import { z } from 'zod';

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
    role: z.enum(['admin', 'doctor', 'patient'], {
      required_error: 'Role is required',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
