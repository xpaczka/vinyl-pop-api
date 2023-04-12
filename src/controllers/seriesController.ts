import { Request, Response } from 'express';
import Pop from '../models/popModel.js';

// Get All Series
export const getAllSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const series = await Pop.aggregate([
      {
        $group: { _id: '$series', quantity: { $sum: 1 } },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ status: 'success', results: series.length, data: { series } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get Pops by Series
export const getPopsBySeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { series } = req.params;
    const formattedSeries: string = series
      .split('-')
      .map(el => el[0].toUpperCase() + el.slice(1))
      .join(' ');

    const pops = await Pop.find({ series: formattedSeries }).select('-__v');
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};
