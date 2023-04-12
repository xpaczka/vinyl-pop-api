import mongoose from "mongoose";
import { IPopData } from '../types.js'

// TODO -> Fix popNumber and mainSeries to be required
const popSchema: mongoose.Schema<IPopData> = new mongoose.Schema({
    name: {type: String, required: [true, 'Pop figure must have a name']},
    popNumber: {type: String},
    mainSeries: {type: String},
    series: {type: String, required: [true, 'Pop figure must have a series']},
    image: {type: String, required: [true, 'Pop figure must have an image']},
})

const Pop: mongoose.Model<IPopData> = mongoose.model('Pop', popSchema)

export default Pop;