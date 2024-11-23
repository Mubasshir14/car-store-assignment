import { Request, Response } from 'express';
import { CarServices } from './car.service';
import { TError } from './car.interface';

export const sendError = (
  res: Response,
  message: string,
  error: string | object,
  status: number,
  stack?: string,
) => {
  const errorResponse: TError = {
    success: false,
    message: message,
    error: error,
    stack: stack || undefined,
  };
  res.status(status).json(errorResponse);
};

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
    sendError(res, err.message, err, 500, err.stack);
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
    sendError(res, err.message, err, 500, err.stack);
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
    sendError(res, err.message, err, 500, err.stack);
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
    sendError(res, err.message, err, 500, err.stack);
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
    sendError(res, err.message, err, 500, err.stack);
  }
};

export const CarControllers = {
  createCar,
  getCar,
  getSingleCar,
  deleteSingleCar,
  updateCar,
};
