/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, car, quantity } = req.body.order;
    const result = await OrderServices.createSingleOrder(email, car, quantity);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      status: false,
      error: error.message,
    });
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
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      status: false,
      error: error.message,
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDb(orderId);
    res.status(200).json({
      success: true,
      message: 'Order is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      status: false,
      error: error.message,
    });
  }
};

const deleteSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.deleteSingleOrderFromDB(orderId);
    res.status(200).json({
      success: true,
      message: 'Order is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { order: orderData } = req.body;

    const result = await OrderServices.updateSingleOrderFromDB(
      orderId,
      orderData,
    );
    res.send({
      status: true,
      message: 'Order is  updated successfully',
      data: [result],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenue();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: {
        totalRevenue: result,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Something Went Wrong',
      err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrder,
  getSingleOrder,
  deleteSingleOrder,
  updateOrder,
  calculateRevenue,
};
