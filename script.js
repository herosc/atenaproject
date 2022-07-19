const puppeteer = require('puppeteer');

var bookTitle = "";
var authorName = "";
var publisherName = "";
var language = "";
var yearIndication = "";
var bookSearch = "Cosmos"; // Variável bookSearch será definida em HardCode temporariamente para fins de teste. Porém deverá vir do formulário na tela da aplicação Catalogar Livro.

async function bookFinder(){

    // Responsável por abrir o navegador, pesquisar pelo livro e preencher o formulário de forma automática.
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36')
    
    // Instruções gerais para procura do livro no site da Amazon (foda-se. Desisto.).
    await page.goto ('https://www.amazon.com.br/'); 

    await page.waitForSelector('input[type="text"]');
    await page.click('input[type="text"]');
    await page.keyboard.sendCharacter (bookSearch);
    await page.click('input[type="submit"]');

    // Mapeamento dos possíveis resultados provenientes de patrocínio na página da amazon feita nos três primeiros livros.
    const firstElementSponsor = await page.waitForSelector('div[data-index="1"]');
    const firstValue = await firstElementSponsor.evaluate(el => el.textContent);
    const firstResult = firstValue.includes('Patrocinados');

    const secondElementSponsor = await page.waitForSelector('div[data-index="2"]');
    const secondValue = await secondElementSponsor.evaluate(el => el.textContent);
    const secondResult = secondValue.includes('Patrocinados');

    const thirdElementSponsor = await page.waitForSelector('div[data-index="3"]');
    const thirdValue = await thirdElementSponsor.evaluate(el => el.textContent);
    const thirdResult = thirdValue.includes('Patrocinados');

    let mapImageElements = await page.$$('[class="a-size-base-plus a-color-base a-text-normal"]');


    // Define qual dos resultados da pesquisa é o mais próximo de ser o correto (excluindo os três primeiros anúncios).
    if (firstResult == false){

        await mapImageElements[0].click();

    }else if (secondResult == false){

        await mapImageElements[1].click();

    }else if (thirdResult == false){

        await mapImageElements[2].click();

    }else {

        await mapImageElements[3].click();

    }

    await browser.close();

    console.log(firstResult);
    console.log(secondResult);
    console.log(thirdResult);
    console.log("FIM");
}

bookFinder();