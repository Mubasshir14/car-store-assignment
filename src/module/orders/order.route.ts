import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrder);
router.get('/revenue', OrderControllers.calculateRevenue);
router.get('/:orderId', OrderControllers.getSingleOrder);
router.delete('/:orderId', OrderControllers.deleteSingleOrder);
router.put('/:orderId', OrderControllers.updateOrder);

export const OrderRoutes = router;
