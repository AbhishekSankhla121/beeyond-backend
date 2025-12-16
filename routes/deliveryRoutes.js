import express from 'express'

import { assignOrder, getUnassignedOrder, updateOrderStatus } from '../controller/deliveryController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();
router.route('/order')
.get(isAuthenticated,checkRole(["DELIVERY"]),getUnassignedOrder )
.post(isAuthenticated,checkRole(["DELIVERY"]),assignOrder)
.patch(isAuthenticated,checkRole(["DELIVERY"]),updateOrderStatus)


export default router  