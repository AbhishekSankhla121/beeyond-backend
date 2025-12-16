import express from 'express'
import { getProduct, placeOrder } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();
router.route('/product').get(isAuthenticated,checkRole(['CUSTOMER']),getProduct)
router.route('/order').post(isAuthenticated,checkRole(['CUSTOMER']),placeOrder)

export default router  