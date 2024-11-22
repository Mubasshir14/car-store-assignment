import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  car: z.string().uuid('Invalid car ID format').nonempty('Car is required'),
  quantity: z
    .number()
    .min(1, 'Quantity cannot be less than 1')
    .int('Quantity must be an integer'),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
});

export default orderValidationSchema;
