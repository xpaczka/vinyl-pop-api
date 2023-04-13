import { Request, Response } from 'express';
import Pop from '../models/popModel.js';
import { IPopData } from '../types.js';

const findDocuments = async (options?: object): Promise<IPopData[]> => {
  try {
    const documents = await (options ? Pop.find(options) : Pop.find()).select('-__v');
    return documents;
  } catch(err) {
    console.log(err);
    return [];
  }
}

// Get All Pops
export const getAllPops = async (_: Request, res: Response): Promise<void> => {
  try {
    const pops = await findDocuments();
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get Pops by Number
export const getPopsByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const pops = await findDocuments({ popNumber: req.params.popNumber });
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get Multipacks
export const getMultipacks = async (_: Request, res: Response): Promise<void> => {
  try {
    const pops = await findDocuments({ multipack: { $ne: null } });
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get All Series
export const getAllSeries = async (_: Request, res: Response): Promise<void> => {
  try {
    const series = await Pop.aggregate([
      { $group: { _id: '$series', quantity: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, name: '$_id', quantity: 1 } }
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

    const pops = await Pop.find({ series: { $regex: formattedSeries, $options: 'i' } }).select('-__v');
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};