import express from 'express'

import { createUser, loginUser, logout, userInfo } from '../controller/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();
router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticated,userInfo)

export default router  