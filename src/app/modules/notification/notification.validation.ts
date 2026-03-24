import { z } from 'zod';

// --- Create Notification Schema ---
const createNotificationZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    message: z.string({ required_error: 'Message is required' }),
    viewedBy: z.array(z.string()).optional(),
  }),
});

// --- Update Notification Schema ---
const updateNotificationZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    viewedBy: z.array(z.string()).optional(),
  }),
});

export const NotificationValidation = {
  createNotificationZodSchema,
  updateNotificationZodSchema,
};
