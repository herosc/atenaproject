const puppeteer = require('puppeteer');

function countObjects (){
    // Conta quantos objetos específicos aparecem na tela que está sendo exibida.
}

async function bookFinder(){

    // Responsável por abrir o navegador, pesquisar pelo livro e preencher o formulário de forma automática.

    const browser = await puppeteer.launch({headless: false,});
    const page = await browser.newPage();

    var bookSearch = "Cosmos";
    // Variável bookSearch será definida em HardCode temporariamente para fins de teste. Porém deverá vir do formulário na tela da aplicação Catalogar Livro.

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