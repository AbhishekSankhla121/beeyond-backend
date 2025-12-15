import express from 'express'
import { getAdminUser } from '../controller/adminController.js';

const router = express.Router();
router.route('/').get(getAdminUser)

export default router  