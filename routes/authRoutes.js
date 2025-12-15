import express from 'express'

import { createUser } from '../controller/authController.js';

const router = express.Router();
router.route('/login').post(createUser)

export default router  