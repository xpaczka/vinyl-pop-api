import express, { Application } from 'express';
import popRouter from './routes/popRoutes.js';
import seriesRouter from './routes/seriesRouter.js';

const app: Application = express();
app.use(express.json());

// API Routes Middleware
app.use('/api/v1/pops', popRouter);
app.use('/api/v1/series', seriesRouter);

export default app;
