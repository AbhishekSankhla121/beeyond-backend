import express from 'express'

import { createUser, loginUser, logout } from '../controller/authController.js';

const router = express.Router();
router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)

export default router  