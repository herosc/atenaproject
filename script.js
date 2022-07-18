const puppeteer = require('puppeteer');

async function bookFinder(){

    // Responsável por abrir o navegador, pesquisar pelo livro e preencher o formulário de forma automática.

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    

    var bookSearch = "Cosmos";
    // Variável bookSearch será definida em HardCode temporariamente para fins de teste. Porém deverá vir do formulário na tela da aplicação Catalogar Livro.

    var bookTitle = "";
    var authorName = "";
    var publisherName = "";
    var language = "";
    var yearIndication = "";

    // instruções gerais para procura do livro na base da Biblioteca Mário de Andrade.
    await page.goto ('http://alexandria.brazilsouth.cloudapp.azure.com/pesquisa/index.jsf'); 

    await page.click ('#buscaSimples');
    await page.keyboard.sendCharacter (bookSearch);
    await page.click ('[id="j_idt71"]',);
    // await page.waitForSelector('[id="tabelaResult:0:commandLinkVerTitulo2"]');
    // await page.click ('[id="tabelaResult:0:commandLinkVerTitulo2"]',);

    var elementTitle = await page.waitForSelector('[id="tabelaResult:0:commandLinkVerTitulo2"]');
    var bookTitle = await elementTitle.evaluate(el => el.textContent);
    console.log('O título do livro é ' + bookTitle);


    // await browser.close();
}

bookFinder();