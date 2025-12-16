import express from 'express'
import { createProduct, deliveryPartner } from '../controller/adminController.js';
import { checkRole } from '../middleware/checkRole.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.route('/product').post(isAuthenticated,checkRole(["ADMIN"]),createProduct)
router.route('/get-partner').get(isAuthenticated,checkRole(["ADMIN"]),deliveryPartner)

export default router  