/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { TError } from './order.interface';
import orderValidationSchema from './order.validation';

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

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, car, quantity, totalPrice } = req.body;
    const orderValidateData = await orderValidationSchema.parse({
      email,
      car,
      quantity,
      totalPrice,
    });
    const result = await OrderServices.createSingleOrder(
      orderValidateData.email,
      orderValidateData.car,
      orderValidateData.quantity,
    );
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      sendError(res, 'Validation Error', err.message, 400, err?.stack);
    } else {
      sendError(res, err.message, err, 500, err.stack);
    }
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getOrderFromDB();
    res.status(200).json({
      message: 'Orders are retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDb(orderId);
    res.status(200).json({
      message: 'Order is retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.deleteSingleOrderFromDB(orderId);
    res.status(200).json({
      message: 'Order is deleted successfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: result,
      },
    });
  } catch (err: any) {
    sendError(res, err.message, err, 500, err.stack);
  }
};

export const OrderControllers = {
  createOrder,
  getOrder,
  getSingleOrder,
  deleteSingleOrder,
  calculateRevenue,
};
