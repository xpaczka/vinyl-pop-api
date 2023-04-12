import express, { Application, Response } from 'express';
import Pop from './models/popModel.js';

const app: Application = express();

app.use(express.json());

app.get('/api/v1/pops', async (_, res: Response) => {
    try {
        const pops = await Pop.find().select('-__v')
        res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
    } catch (err) {
        res.status(404).json({ status: 'failed', message: err })
    }
})

export default app;