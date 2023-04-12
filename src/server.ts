import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const DB = process.env.DATABASE!.replace('<PASSWORD>', process.env.DATABASE_PASSWORD!);
mongoose.connect(DB).then(() => console.log('Connected to database...'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
