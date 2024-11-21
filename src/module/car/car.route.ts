import express from 'express';
import { CarControllers } from './car.controller';
const router = express.Router();

router.post('/create-car', CarControllers.createCar);
router.get('/', CarControllers.getCar);
router.get('/:carId', CarControllers.getSingleCar);
router.delete('/:carId', CarControllers.deleteSingleCar);
router.put('/:carId', CarControllers.updateCar);

export const CarRoutes = router;
