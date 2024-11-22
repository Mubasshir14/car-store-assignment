import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CarRoutes } from './module/car/car.route';
import { OrderRoutes } from './module/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
  });
};

app.get('/', getAController);

export default app;
