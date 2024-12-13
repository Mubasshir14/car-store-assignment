import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand Name is required'],
      minlength: [4, 'Brand Name must conatin at least 4 characters'],
      maxlength: [30, 'Brand Name can not contain more than 30 characters'],
    },
    model: {
      type: String,
      required: [true, 'Model Name is required'],
      minlength: [4, 'Model Name must conatin at least 4 characters'],
      maxlength: [30, 'Model Name can not contain more than 30 characters'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      validate: {
        validator: (value: number) => {
          const currentYear = new Date().getFullYear();
          return value <= currentYear;
        },
        message:
          '{VALUE} is not a valid year. It can not be greater than current year.',
      },
    },
    price: {
      type: Number,
      requires: [true, 'Price is required'],
      min: [1, 'Price can not be negative or zero'],
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
      minlength: [20, 'Description must conatin at least 20 characters'],
      maxlength: [400, 'Description can not contain more than 400 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity can not be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    // createdAt: {
    //   type: String
    // },
    // updatedAt: {
    //   type: String
    // }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const Car = model<TCar>('Car', carSchema);
