import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import performScraping from './perform-scraping.js';
import Pop from '../models/popModel.js';

dotenv.config();

const DB = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
const urlLinks: string[] = JSON.parse(fs.readFileSync('./src/dev-data/data/sources.json', 'utf-8'));
const pops = JSON.parse(fs.readFileSync('./src/dev-data/data/data.json', 'utf-8'));

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DB);
    console.log('Connected to database...');
  } catch (err) {
    console.log(err);
  }
};

const scrapeData = async (): Promise<void> => {
  try {
    const data = await performScraping(urlLinks);
    fs.writeFile('./src/dev-data/data/data.json', JSON.stringify(data), () => console.log('Data written succesfully'));
  } catch (err) {
    console.log(err);
  }
};

const importData = async (): Promise<void> => {
  try {
    await Pop.create(pops);
    console.log('Data imported succesfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async (): Promise<void> => {
  try {
    await Pop.deleteMany();
    console.log('Data deleted succesfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const initOperation = async (): Promise<void> => {
  try {
    switch (process.argv[2]) {
      case '--get':
        await scrapeData();
        break;
      case '--import':
        await connectToDatabase();
        await importData();
        break;
      case '--delete':
        await connectToDatabase();
        await deleteData();
        break;
    }
  } catch (err) {
    console.log(err);
  }
};

initOperation();
