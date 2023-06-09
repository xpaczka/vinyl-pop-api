import { IPopData } from '../types.js';

const scrapeName = (data: cheerio.Cheerio, container: IPopData[], $: cheerio.Root): void => {
  data.each((index, element) => container[index].name = $(element).text())
};

const scrapeAdditionalInfo = (data: cheerio.Cheerio, container: IPopData[], $: cheerio.Root, series: string): void => {
  const filteredScrapedInfo = data.toArray().filter(el => $(el).text() !== 'n');

  for (let i = 0; i < filteredScrapedInfo.length; i++) {
    const textData = $(filteredScrapedInfo[i]).text();
    let popNumber: string;

    if (textData.includes('/')) {
      popNumber = textData.split('/')[1];
    } else {
      popNumber = textData.split('#')[1];
    }

    if (popNumber) {
      if (popNumber.toLowerCase().includes('pack')) {
        const multipackSize = popNumber.trim().split(' ')[0];
        container[i].multipack = +multipackSize;
        continue;
      }

      if (popNumber.includes('#')) popNumber = popNumber.trim().slice(1);
      if (popNumber.startsWith('0')) popNumber = popNumber.slice(1);

      if (/[A-Z]\w+/g.test(popNumber)) {
        const cleanPopNumber = popNumber.match(/[0-9]/g)?.join('');

        if (cleanPopNumber) {
          container[i].popNumber = +cleanPopNumber.trim();
          continue;
        }
      }

      container[i].popNumber = +popNumber.trim();
    }
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
