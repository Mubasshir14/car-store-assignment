/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { CarServices } from './car.service';
import { TError } from './car.interface';
import carValidationSchema from './car.validation';

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
    const carData = req.body;
    const validateCarData = await carValidationSchema.parse(carData);
    const result = await CarServices.createCarIntoDB(validateCarData);

    res.status(200).json({
      message: 'Car created successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      sendError(res, 'Validation failed', err, 400, err?.stack);
    } else {
      sendError(res, err.message, err, 500, err.stack);
    }
  }
};

const getCar = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getCarFromDB();
    res.status(200).json({
      message: 'Cars retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);
    res.status(200).json({
      message: 'Car retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const deleteSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.deleteSingleCarFromDB(carId);
    res.status(200).json({
      message: 'Car deleted successfully',
      success: true,
      data: {},
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const carData = req.body;

    const result = await CarServices.updateSingleCar(carId, carData);
    res.send({
      message: 'Car updated successfully',
      status: true,
      data: [result],
    });
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
