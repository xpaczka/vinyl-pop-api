import express, { Router } from 'express';
import { getAllPops, getMultipacks, getPopsByNumber, getAllSeries, getPopsBySeries } from '../controllers/popController.js';

const router: Router = express.Router();

router.route('/').get(getAllPops);
router.route('/series').get(getAllSeries);
router.route('/series/:series').get(getPopsBySeries);
router.route('/multipacks').get(getMultipacks);
router.route('/:popNumber').get(getPopsByNumber);

export default router;
