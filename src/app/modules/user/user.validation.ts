import { z } from 'zod';

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }).min(6, 'Password must be at least 6 characters'),
  }),
});

export const UserValidation = {
  changePasswordValidationSchema,
};
