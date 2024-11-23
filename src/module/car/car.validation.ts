import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z
    .string()
    .min(4, { message: 'Brand Name must contain at least 4 characters' })
    .max(30, { message: 'Brand Name cannot contain more than 30 characters' })
    .nonempty({ message: 'Brand Name is required' }),

  model: z
    .string()
    .min(4, { message: 'Model Name must contain at least 4 characters' })
    .max(30, { message: 'Model Name cannot contain more than 30 characters' })
    .nonempty({ message: 'Model Name is required' }),

  year: z
    .number()
    .min(1, { message: 'Year must be greater than or equal to 1' })
    .max(new Date().getFullYear(), {
      message: 'Year cannot be greater than the current year',
    })
    .nonnegative({ message: 'Year is required' }),

  price: z
    .number()
    .min(1, { message: 'Price cannot be negative or zero' })
    .nonnegative({ message: 'Price is required' }),

  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: (issue) => ({
      message: `${issue.message}. Choose from these 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'`,
    }),
  }),

  description: z
    .string()
    .min(20, { message: 'Description must contain at least 20 characters' })
    .max(400, {
      message: 'Description cannot contain more than 400 characters',
    })
    .nonempty({ message: 'Description is required' }),

  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be negative' })
    .nonnegative({ message: 'Quantity is required' }),

  inStock: z.boolean().default(true),
});

export default carValidationSchema;
