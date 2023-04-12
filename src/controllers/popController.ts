import { Request, Response } from 'express';
import Pop from '../models/popModel.js';

// Get All Pops
export const getAllPops = async (_: Request, res: Response): Promise<void> => {
  try {
    const pops = await Pop.find().select('-__v');
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get Pops by Number
export const getPopsByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { popNumber } = req.params;
    const pops = await Pop.find({ popNumber }).select('-__v');
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};

// Get Multipacks
export const getMultipacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const pops = await Pop.find({ multipack: { $ne: null } }).select('-__v');
    res.status(200).json({ status: 'success', results: pops.length, data: { pops } });
  } catch (err) {
    res.status(404).json({ status: 'failed', message: err });
  }
};
