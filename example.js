const puppeteer = require('puppeteer');


(async () => {

  const browser = await puppeteer.launch({width: 1360, height: 920});
  
  const page = await browser.newPage();

  await page.setViewport({
    width: 1024,
    height: 760,
    deviceScaleFactor: 1,
  });

  await page.waitFor(1000);
  await page.goto('https://bank.gov.ua/markets/exchangerates');
  await page.waitFor(1000);

  const inputDateElement = await page.$('input#date');

  await inputDateElement.click();


  for (let i=0; i < 10; i++) {
    await page.keyboard.press("Backspace");
  }

  await page.screenshot({path: 'bank' + Date.now() + '.png'});

  await page.keyboard.type('10.03.2020');

  await page.keyboard.press('Enter');

  await page.waitFor(1000);
  await page.screenshot({path: 'bank' + Date.now() + '.png'});


  const tableWithRates = await page.$('table#exchangeRates');

  await tableWithRates.screenshot({path: 'bank' + Date.now() + '.png'});

  await browser.close();

})();