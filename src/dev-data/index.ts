import fs from 'fs';
import performScraping from './perform-scraping.js';

const urlLinks: string[] = JSON.parse(fs.readFileSync('./src/dev-data/data/sources.json', 'utf-8'));

const saveData = async (): Promise<void> => {
  const data = await performScraping(urlLinks);

  fs.writeFile('./src/dev-data/data/data.json', JSON.stringify(data), err => {
    if (err) console.log(err);
    console.log('Data written succesfully');
  });
};

saveData();
