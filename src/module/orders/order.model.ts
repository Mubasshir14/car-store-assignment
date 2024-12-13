import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => {
          const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
          return emailRegex.test(value);
        },
        message: 'Please enter a valid email address',
      },
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car is required'],
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: function (value: any) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Invalid Car ID',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity cannot be less than 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
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

export const Order = model<TOrder>('Order', orderSchema);
