import cheerio from 'cheerio';
import axios from 'axios';
import insertScrapedData from './insert-scraped-data.js';
import { IPopData } from '../types.js';

const performScraping = async (urlLinks: string[]): Promise<IPopData[]> => {
  const data: IPopData[][] = [];

  for (const url of urlLinks) {
    const response = await axios.request({
      method: 'GET',
      url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const scrapedName = $('.sow-features-feature .textwidget h5');
    const scrapedInfo = $('.sow-features-feature .textwidget p');
    const scrapedImage = $('.sow-features-feature .sow-icon-image');

    const series = url
      .split('/')
      .reverse()[1]
      .split('-')
      .map(el => el[0].toUpperCase() + el.slice(1))
      .filter(el => el !== 'Pop')
      .join(' ');

    const popData: IPopData[] = [];

    scrapedName.toArray().forEach((_, index) => {
      popData.push({
        name: '',
        image: '',
      });

      if (series) popData[index].series = series;
    });

    insertScrapedData(scrapedName, scrapedInfo, scrapedImage, popData, $, series);
    data.push(popData);
  }

  return data.flat() as IPopData[];
};

export default performScraping;
