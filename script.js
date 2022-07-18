const puppeteer = require('puppeteer');

async function bookFinder(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // nome da variável temporário: Cosmos. Para fins de teste da aplicação no início. Pelo livro ter mais informações no site em que será realizada a busca (Amazon).
    var bookTitle = "Cosmos"; 
    await page.goto('https://amazon.com.br/');

    await browser.close();
}

robo();