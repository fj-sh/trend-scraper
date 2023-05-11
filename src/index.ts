import { chromium } from 'playwright';

export interface Event {
  eventYear: number;
  name: string;
}

async function getEvent() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.aflo.com/ja/pages/editorial/nenpyo');
  await page.waitForTimeout(1000);

  const events: Event[] = [];

  // #search1990 > div.ageBox > div:nth-child(5) > div > div > a > span
  // #search1990 > div.ageBox > div:nth-child(8) > div > div > a > span

  const year = 2020;
  for (let i = 4; i < 5; i++) {
    const nendaiSelector = `#search${year} > div.ageBox > div:nth-child(${i}) > div > div > a > span`;
    //                      #search2020 > div.ageBox > div:nth-child(4) > div > div > a > span
    const event1Selector = `#search${year} > div.ageBox > div:nth-child(${i}) > div > ul > li:nth-child(1)`;
    const event2Selector = `#search${year} > div.ageBox > div:nth-child(${i}) > div > ul > li:nth-child(2)`;
    const event3Selector = `#search${year} > div.ageBox > div:nth-child(${i}) > div > ul > li:nth-child(3)`;

    const nendai: string = await page.$eval(nendaiSelector, (element) => element.textContent);
    const event1: string = await page.$eval(event1Selector, (element) => element.textContent);
    const event2: string = await page.$eval(event2Selector, (element) => element.textContent);
    const event3: string = await page.$eval(event3Selector, (element) => element.textContent);

    events.push({
      eventYear: Number(nendai.replace('年', '')),
      name: event1
        .replace(/[\n\t]/g, '')
        .replace('写真を見る動画を見る', '')
        .replace('写真を見る', ''),
    });
    events.push({
      eventYear: Number(nendai.replace('年', '')),
      name: event2
        .replace(/[\n\t]/g, '')
        .replace('写真を見る動画を見る', '')
        .replace('写真を見る', ''),
    });
    events.push({
      eventYear: Number(nendai.replace('年', '')),
      name: event3
        .replace(/[\n\t]/g, '')
        .replace('写真を見る動画を見る', '')
        .replace('写真を見る', ''),
    });
  }

  console.log(events);

  await browser.close();
}

getEvent()
  .then(() => {
    console.log('データを収集しています...');
  })
  .catch((error) => {
    console.error(error);
  });
