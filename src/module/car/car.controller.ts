import { Request, Response } from 'express';
import { CarServices } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const { car: carData } = req.body;
    const result = await CarServices.createCarIntoDB(carData);
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const getCar = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getCarFromDB();
    res.status(200).json({
      success: true,
      message: 'Cars are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car is retrieved ',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const deleteSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.deleteSingleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car is deleted',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const { car: carData } = req.body;

    const result = await CarServices.updateSingleCar(carId, carData);
    res.send({
      status: true,
      message: 'Car updated successfully',
      data: [result],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

export const CarControllers = {
  createCar,
  getCar,
  getSingleCar,
  deleteSingleCar,
  updateCar,
};
