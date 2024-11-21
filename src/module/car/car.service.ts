import { TCar } from './car.interface';
import { Car } from './car.model';
import { Types } from 'mongoose';
const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

const getCarFromDB = async () => {
  const result = await Car.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);
  return result;
};

const deleteSingleCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};

const updateSingleCar = async (id: string, carData: TCar) => {
  const result = await Car.findByIdAndUpdate(id, carData, {
    new: true,
  });
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getCarFromDB,
  getSingleCarFromDB,
  deleteSingleCarFromDB,
  updateSingleCar,
};
