import { z } from 'zod';
import mongoose from 'mongoose';

export const orderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(50, { message: 'Email must not exceed 50 characters' })
    .refine((value) => !value.startsWith('.'), {
      message: 'Email cannot start with a dot',
    })
    .refine((value) => !value.endsWith('.'), {
      message: 'Email cannot end with a dot',
    })
    .refine((value) => !value.includes('..'), {
      message: 'Email cannot contain consecutive dots',
    })
    .refine((value) => value.split('@')[1]?.includes('.'), {
      message: 'Email must have a valid domain with a dot',
    })
    .refine(
      (value) =>
        ['gmail.com', 'yahoo.com', 'outlook.com'].includes(value.split('@')[1]),
      {
        message:
          'Email must belong to a valid domain (gmail.com, yahoo.com, outlook.com)',
      },
    ),
  car: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid Car ID',
  }),
  quantity: z.number().min(1, { message: 'Quantity cannot be less than 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' })
    .optional(),
});

export default orderValidationSchema;
