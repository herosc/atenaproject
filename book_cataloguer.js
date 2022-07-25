async function catalogue(completeTitle,amount,author,nPages,public,publisher,bookLang){

    // const pageID = 'input[class="whsOnd zHQkBf"]';
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

    await page.goto('https://forms.gle/Fh8EQhaFG3EmKETR9')
    page.setDefaultTimeout(30000);
    

    await page.waitForSelector('div[class="aCsJod oJeWuf"]');
    let field = await page.$$('div[class="aCsJod oJeWuf"]'); 
    await field[1].click();
    await page.keyboard.sendCharacter (completeTitle);
}