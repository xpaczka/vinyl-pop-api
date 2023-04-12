import express, { Router } from 'express';
import { getPopsBySeries, getAllSeries } from '../controllers/seriesController.js';

const router: Router = express.Router();

router.route('/').get(getAllSeries);
router.route('/:series').get(getPopsBySeries);

export default router;
