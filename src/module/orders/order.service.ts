import { Types } from 'mongoose';
import { Car } from '../car/car.model';
import { Order } from './order.model';

const createSingleOrder = async (
  email: string,
  carId: string,
  quantity: number,
) => {
  const car = await Car.findById(carId);
  if (!car) {
    throw new Error('Car Not Found 404!');
  }
  const totalPrice = car.price * quantity;
  if (car.quantity < quantity) {
    throw new Error('Insufficient Stock Available');
  }
  const order = await Order.create({
    email,
    car: carId,
    quantity,
    totalPrice,
  });
  car.quantity -= quantity;
  if (car.quantity === 0) {
    car.inStock = false;
  }
  await car.save();
  return order;
};

const getOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getSingleOrderFromDb = async (id: string) => {
  const result = await Order.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);
  if (result.length === 0) {
    throw new Error('Order not Found 404!');
  }
  return result;
};

const deleteSingleOrderFromDB = async (id: string) => {
  const orderToDelete = await Order.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);

  if (orderToDelete.length === 0) {
    throw new Error('Order not Found 404!');
  }
  const result = await Order.deleteOne({ _id: new Types.ObjectId(id) });
  return result;
};

const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  if (!result.length) {
    throw new Error('No Order Exists');
  }
  return result[0].totalRevenue;
};

export const OrderServices = {
  createSingleOrder,
  getOrderFromDB,
  getSingleOrderFromDb,
  deleteSingleOrderFromDB,
  calculateTotalRevenue,
};
