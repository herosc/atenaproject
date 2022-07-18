const puppeteer = require('puppeteer');

async function bookFinder(){
    const browser = await puppeteer.launch({headless: false,});
    const page = await browser.newPage();

    // nome da variável temporário: Cosmos. Para fins de teste da aplicação no início. Pelo livro ter mais informações no site em que será realizada a busca (Biblioteca Mário de Andrade).
    var bookSearch = "Cosmos";

    var bookTitle = "";
    var authorName = "";
    var publisherName = "";
    var language = "";
    var yearIndication = "";

    // instruções gerais para procura do livro na base da Biblioteca Mário de Andrade.
    await page.goto('http://bibliotecacircula.prefeitura.sp.gov.br/pesquisa/');
    await page.type ('[id="buscaSimples"]',bookSearch);
    await page.click ('[id="j_idt71"]',);
    // await browser.close();
}

bookFinder();