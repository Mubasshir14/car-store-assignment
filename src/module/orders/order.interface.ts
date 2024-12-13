import { Types } from 'mongoose';

export type TError = {
  message: string;
  success: false;
  error: string | object;
  stack?: string;
};

export type TOrder = {
  email: string;
  car: Types.ObjectId | string;
  quantity: number;
  totalPrice: number;
  // createdAt: Date;
  // updatedAt: Date;
};
