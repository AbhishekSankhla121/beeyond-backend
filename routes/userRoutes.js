import express from 'express'
import { getMyOrder, getProduct, myOrders, placeOrder } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();
router.route('/product').get(isAuthenticated,checkRole(['CUSTOMER']),getProduct)
router.route('/order').post(isAuthenticated,checkRole(['CUSTOMER']),placeOrder).get(isAuthenticated,checkRole(['CUSTOMER']),myOrders)
router.route('/order/:id').get(isAuthenticated,checkRole(['CUSTOMER']),getMyOrder)
export default router  