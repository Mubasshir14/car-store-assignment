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
  if (result.length === 0) {
    throw new Error('Car not Found 404!');
  }
  return result[0];
};

const deleteSingleCarFromDB = async (id: string) => {
  const carToDelete = await Car.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);

  if (carToDelete.length === 0) {
    throw new Error('Car not Found 404!');
  }
  const result = await Car.deleteOne({ _id: new Types.ObjectId(id) });
  return result;
};

const updateSingleCar = async (id: string, carData: TCar) => {
  const carToUpdate = await Car.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);

  if (carToUpdate.length === 0) {
    throw new Error('Car not Found 404!');
  }
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
