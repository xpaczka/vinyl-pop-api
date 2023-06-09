import mongoose from 'mongoose';
import { IPopData } from '../types.js';

const popSchema: mongoose.Schema<IPopData> = new mongoose.Schema({
  name: { type: String, required: [true, 'Pop figure must have a name'] },
  image: { type: String, required: [true, 'Pop figure must have an image'] },
  popNumber: { type: Number },
  series: { type: String },
  multipack: { type: Number },
});

const Pop: mongoose.Model<IPopData> = mongoose.model('Pop', popSchema);

export default Pop;
