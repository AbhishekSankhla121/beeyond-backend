import express from 'express'

import { getDeliveryUser } from '../controller/deliveryController.js';

const router = express.Router();
router.route('/').get(getDeliveryUser)

export default router  