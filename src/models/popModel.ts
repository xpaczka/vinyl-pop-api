import mongoose from "mongoose";
import { IPopData } from '../types.js'

// TODO -> Fix popNumber and mainSeries to be required
const popSchema: mongoose.Schema<IPopData> = new mongoose.Schema({
    name: {type: String, required: [true, 'Pop figure must have a name']},
    image: {type: String, required: [true, 'Pop figure must have an image']},
    popNumber: {type: String},
    mainSeries: {type: String},
    series: {type: String},
})

const Pop: mongoose.Model<IPopData> = mongoose.model('Pop', popSchema)

export default Pop;