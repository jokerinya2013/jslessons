const puppeteer = require('puppeteer');

const { generateText, checkAndGenerate } = require('./util');
// unit tests
test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('İbrahim', 30);
  expect(text2).toBe('İbrahim (30 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

// integration test
test('should generete a valid text output', () => {
  const text = checkAndGenerate('İbrahim', 30);
  expect(text).toBe('İbrahim (30 years old)');
});

// e2e testing, flow test

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    // headless: false, //ui
    // slowMo: 80, //slowmotion
    // args: ['--window-size=920,560'],
  });
  const page = await browser.newPage();
  await page.goto('file:///D:/ENES/proceler/jslessons/s31-testing/index.html');
  await page.click('input#name');
  await page.type('input#name', 'Zehra');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Zehra (28 years old)');
}, 10000);
