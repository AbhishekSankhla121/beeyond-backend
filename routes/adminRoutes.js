import express from 'express'
import { getAdminUser } from '../controller/adminController.js';

const router = express.Router();
router.route('/').post(getAdminUser)

export default router  