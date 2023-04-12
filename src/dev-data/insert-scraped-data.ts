import { IPopData } from '../types.js';

const scrapeName = (data: cheerio.Cheerio, container: IPopData[], $: cheerio.Root): void => {
  data.each((index, element) => {
    const name = $(element).text();
    container[index].name = name;
  });
};

const scrapeAdditionalInfo = (data: cheerio.Cheerio, container: IPopData[], $: cheerio.Root, series: string): void => {
  const filteredScrapedInfo = data.toArray().filter(el => $(el).text() !== 'n');

  for (let i = 0; i < filteredScrapedInfo.length; i++) {
    let scrapedInfo: string[];
    const textData = $(filteredScrapedInfo[i]).text();

    if (textData.includes('/')) {
      scrapedInfo = textData.split('/');
    } else {
      scrapedInfo = textData.split('#');
    }

    let [mainSeries, popNumber] = scrapedInfo;

    if (mainSeries.includes(series.split(' ').join('-'))) mainSeries = mainSeries.slice(0, -series.length);
    if (popNumber && popNumber.includes('#')) popNumber = popNumber.trim().slice(1);

    if (mainSeries) container[i].mainSeries = mainSeries.trim();
    if (popNumber) container[i].popNumber = popNumber.trim();
  }
};

const scrapeImage = (data: cheerio.Cheerio, container: IPopData[], $: cheerio.Root): void => {
  data.each((index, element) => {
    const elementInfo = $(element).attr();
    let bgData = elementInfo['data-ezbg'];
    if (!bgData) bgData = elementInfo['style'].split(/[()]/)[1];
    container[index].image = bgData;
  });
};

const insertScrapedData = (
  name: cheerio.Cheerio,
  additionalInfo: cheerio.Cheerio,
  image: cheerio.Cheerio,
  container: IPopData[],
  $: cheerio.Root,
  series: string
): void => {
  scrapeName(name, container, $);
  scrapeAdditionalInfo(additionalInfo, container, $, series);
  scrapeImage(image, container, $);
};

export default insertScrapedData;
