import { chromium } from 'playwright';

interface TrendDrama {
  trendYear: number;
  title: string;
}

// 年代流行の一覧のページから 2010年前はなんかたくさんのテーブルがあった
async function getDramaTitlesByList() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // 1990年代ドラマ https://nendai-ryuukou.com/1990/drama.html
  await page.goto('https://nendai-ryuukou.com/1990/drama.html');
  await page.waitForTimeout(1000);

  const dramaTitleSelector1990 = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(6) > table > tbody > tr:nth-child(n) > td.bold2 > a`;
  const dramaTitleSelector1991 = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(8) > table > tbody > tr:nth-child(n) > td.bold2`;
  const dramaTitleSelector1992 = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(10) > table > tbody > tr:nth-child(n) > td.bold2`;
  const dramaTitleSelector1995 = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(17) > table > tbody > tr:nth-child(n) > td.bold2`;
  const dramaTitles1990 = await page.$$eval(dramaTitleSelector1990, (elements) =>
    elements.map((element) => element.textContent)
  );

  const trendDramas: TrendDrama[] = [];
  let yearIndex = 17;
  for (let year = 1995; year <= 1999; year++) {
    const dramaTitleSelector = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(${yearIndex}) > table > tbody > tr:nth-child(n) > td.bold2`;

    const dramaTitles = await page.$$eval(dramaTitleSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    // Print the drama titles
    console.log(`${year}年代ドラマ:`);
    for (const title of dramaTitles) {
      trendDramas.push({ trendYear: year, title });
    }
    yearIndex += 2;
  }

  console.log(trendDramas);

  await browser.close();
}

async function getDramaTitles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const trendDramas: TrendDrama[] = [];
  for (let year = 2021; year <= 2022; year++) {
    await page.goto(`https://nendai-ryuukou.com/${year}/drama.html`);
    await page.waitForTimeout(1000);
    const dramaTitleSelector = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(4) > table > tbody > tr:nth-child(n) > td.bold2 > a`;
    // #wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(4) > table > tbody > tr:nth-child(2) > td.bold2 > a
    // #wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(4) > table > tbody > tr:nth-child(3) > td.bold2 > a
    const dramaTitles = await page.$$eval(dramaTitleSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    const topTenDramaTitles = dramaTitles.slice(0, 10);
    // Print the drama titles
    console.log(`${year}年代ドラマ:`);
    for (const title of topTenDramaTitles) {
      trendDramas.push({ trendYear: year, title });
    }
  }

  console.log(trendDramas);

  await browser.close();
}

interface TrendMusic {
  trendYear: number;
  artist: string;
  title: string;
}

async function getMusicTitlesByList() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // 2000年代音楽
  await page.goto('https://nendai-ryuukou.com/2000/song.html');
  await page.waitForTimeout(1000);

  const trendMusics: TrendMusic[] = [];

  // #wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(22) > table > tbody > tr:nth-child(2) > td.bold2 > a
  let yearIndex = 22;
  for (let year = 2005; year <= 2009; year++) {
    const musicTitleSelector = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(${yearIndex}) > table > tbody > tr:nth-child(n) > td.bold2 > a`;
    const musicArtistSelector = `#wrapper > div > div:nth-child(4) > div.main02 > div > div:nth-child(${yearIndex}) > table > tbody > tr:nth-child(n) > td:nth-child(3)`;

    const musicTitles = await page.$$eval(musicTitleSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    const musicArtists = await page.$$eval(musicArtistSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    // Print the music titles and artists
    console.log(`${year}年代音楽:`);
    for (let i = 0; i < musicTitles.length; i++) {
      const title = musicTitles[i];
      const artist = musicArtists[i];
      trendMusics.push({ trendYear: year, title, artist });
    }
    yearIndex += 3;
  }

  console.log(trendMusics);

  await browser.close();
}

async function getMusicTitles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const trendMusics = [];
  for (let year = 2019; year <= 2019; year++) {
    try {
      await page.goto(`https://entamedata.web.fc2.com/music2/reco_dl_${year}.html`, {
        timeout: 5000,
        waitUntil: 'domcontentloaded',
      });
    } catch (error) {
      console.log(error);
      continue;
    }
    await page.waitForSelector('body');
    const musicTitleSelector = `body > table:nth-child(16) > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(1)`;
    const musicArtistSelector = `body > table:nth-child(16) > tbody > tr:nth-child(n) > td:nth-child(3) > a`;

    const musicTitles = await page.$$eval(musicTitleSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    const musicArtists = await page.$$eval(musicArtistSelector, (elements) =>
      elements.map((element) => element.textContent)
    );

    const topTenMusicTitles = musicTitles.slice(0, 15);
    console.log(`${year}年代音楽:`);
    for (let i = 0; i < topTenMusicTitles.length; i++) {
      const title = musicTitles[i];
      const artist = musicArtists[i];
      trendMusics.push({ trendYear: year, title, artist });
    }
  }

  console.log(trendMusics);

  await browser.close();
}

async function getMusicTitlesInLatestSite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2022はこれ
  // https://entamedata.com/2022/12/09/2022%e5%b9%b4%e3%81%ab%e3%83%92%e3%83%83%e3%83%88%e3%81%97%e3%81%9f%e9%9f%b3%e6%a5%bd%e3%83%80%e3%82%a6%e3%83%b3%e3%83%ad%e3%83%bc%e3%83%89%e6%9b%b2%e3%81%a3%e3%81%a6%e4%bd%95%ef%bc%9f/
  // 2021年代音楽
  await page.goto(
    'https://entamedata.com/2022/07/08/2022%e5%b9%b4%e4%bb%a4%e5%92%8c4%e5%b9%b4%e3%81%ae%e3%83%92%e3%83%83%e3%83%88%e6%9b%b2%e3%81%a7%e9%9f%b3%e6%a5%bd%e3%83%95%e3%82%a9%e3%83%ab%e3%83%80best%e3%82%92%e4%bd%9c%e3%82%8a%e3%81%9f%e3%81%84/'
  );
  await page.waitForTimeout(1000);

  const trendMusics: TrendMusic[] = [];

  const musicTitleSelector = `#post-125877 > div > small:nth-child(26) > table > tbody > tr:nth-child(n) > td:nth-child(2) > big > b > a`;
  const musicArtistSelector = `#post-125877 > div > small:nth-child(26) > table > tbody > tr:nth-child(n) > td:nth-child(2)`;
  const musicTitles = await page.$$eval(musicTitleSelector, (elements) =>
    elements.map((element) => element.textContent)
  );

  const musicArtists = await page.$$eval(musicArtistSelector, (elements) =>
    elements.map((element) => {
      const text = element.textContent || '';
      const index = text.indexOf('/') + 1;
      const slicedText = text.slice(index).trim();
      const index2 = slicedText.indexOf('#');
      return slicedText.slice(0, index2).trim();
    })
  );
  for (let i = 0; i < musicTitles.length; i++) {
    const title = musicTitles[i];
    const artist = musicArtists[i];
    trendMusics.push({ trendYear: 2022, title, artist });
  }

  const topTenMusicTitles = musicTitles.slice(0, 15);
  console.log(trendMusics);

  await browser.close();
}

getMusicTitlesInLatestSite()
  .then(() => {
    console.log('データを収集しています...');
  })
  .catch((error) => {
    console.error(error);
  });
