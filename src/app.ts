import fs from 'fs'
import express, { Application, Response } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/api/v1/pops', (_, res: Response) => {
    const pops = JSON.parse(fs.readFileSync('./src/dev-data/data/data.json', 'utf-8'));
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
})

export default app;