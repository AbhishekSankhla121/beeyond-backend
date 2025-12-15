import express from 'express'
import { getUser } from '../controller/userController.js';

const router = express.Router();
router.route('/').get(getUser)

export default router  