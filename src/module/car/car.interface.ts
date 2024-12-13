export type TError = {
  message: string;
  success: false;
  error: string | object;
  stack?: string;
};

export type TCar = {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  inStock: boolean;
  // createdAt?: string;
  // updatedAt?: string;
};
