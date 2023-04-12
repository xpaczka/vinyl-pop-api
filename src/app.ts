import express, { Application } from 'express';
import popRouter from './routes/popRoutes.js';

const app: Application = express();
app.use(express.json());

// API Routes Middleware
app.use('/api/v1/pops', popRouter);

export default app;
