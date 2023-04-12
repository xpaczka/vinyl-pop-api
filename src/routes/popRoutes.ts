import express, { Router } from 'express';
import { getAllPops, getPopsByNumber } from '../controllers/popController.js';

const router: Router = express.Router();

router.route('/').get(getAllPops)
router.route('/:popNumber').get(getPopsByNumber)

export default router;