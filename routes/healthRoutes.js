import express from 'express'
import { gethealth } from '../controller/healthController.js';
const router = express.Router();
router.route('/').get(gethealth)
export default router  