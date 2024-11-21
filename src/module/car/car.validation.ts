import { z } from 'zod';

const carValidationSchema = z.object({
  brand: z.string().min(1, { message: 'Brand Name is required' }),
  model: z.string().min(1, { message: 'Model Name is required' }),
  year: z.number().min(1900, { message: 'Year is required' }),
  price: z.number().min(1, { message: 'Price is required' }),
  category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], {
    errorMap: (issue) => {
      return {
        message: `${issue.message}. Choose from these 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'`,
      };
    },
  }),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z.number().min(1, { message: 'Quantity is required' }),
  inStock: z.boolean().default(true),
});

export default carValidationSchema;
