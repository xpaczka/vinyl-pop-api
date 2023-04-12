import express, { Router } from 'express';
import { getAllPops, getMultipacks, getPopsByNumber } from '../controllers/popController.js';

const router: Router = express.Router();

router.route('/').get(getAllPops);
router.route('/multipacks').get(getMultipacks);
router.route('/:popNumber').get(getPopsByNumber);

export default router;
