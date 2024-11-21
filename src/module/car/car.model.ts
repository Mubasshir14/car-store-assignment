import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>({
  brand: {
    type: String,
    required: [true, 'Brand Name is required'],
  },
  model: {
    type: String,
    required: [true, 'Model Name is required'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  price: {
    type: Number,
    requires: [true, 'Price is required'],
  },
  category: {
    type: String,
    enum: {
      values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      message:
        "{VALUE} is not correct. Choose from these 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'",
    },
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

export const Car = model<TCar>('Car', carSchema);
