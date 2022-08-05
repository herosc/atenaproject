async function catalogue(completeTitle,authorID,pagesAmount,publisherID,languageID){

    // const pageID = 'input[class="whsOnd zHQkBf"]';
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

    await page.goto('https://forms.gle/Fh8EQhaFG3EmKETR9')
    page.setDefaultTimeout(30000);
    

    await page.waitForSelector('div[class="aCsJod oJeWuf"]');
    let field = await page.$$('div[class="aCsJod oJeWuf"]'); 

    await page.waitForNavigation()
    await field[0].click();
    await page.keyboard.sendCharacter (completeTitle);

    await field[2].click();
    await page.keyboard.sendCharacter (authorID);

    await field[3].click();
    await page.keyboard.sendCharacter (pagesAmount);

    await field[6].click();
    await page.keyboard.sendCharacter (publisherID);

    await field[7].click();
    await page.keyboard.sendCharacter (languageID);
}

async function bookFinder(searchTerm){
    const puppeteer = require('puppeteer');

    var bookSearch = searchTerm;

    // Responsável por abrir o navegador, pesquisar pelo livro e preencher o formulário de forma automática.
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

    // Instruções gerais para procura do livro no site da Amazon.
    await page.goto ('https://www.amazon.com.br/'); 

    page.setDefaultTimeout(30000);

    await page.waitForSelector('input[type="text"]');
    await page.click('input[type="text"]');
    await page.keyboard.sendCharacter (bookSearch);
    await page.click('input[type="submit"]');

    // Mapeamento dos possíveis resultados provenientes de patrocínio na página da amazon feita nos três primeiros livros.

    const firstElementSponsor = await page.waitForSelector('div[data-cel-widget="search_result_1"]');
    const firstValue = await firstElementSponsor.evaluate(el => el.textContent);
    const firstResult = firstValue.includes('Patrocinados');

    const secondElementSponsor = await page.waitForSelector('div[data-cel-widget="search_result_2"]');
    const secondValue = await secondElementSponsor.evaluate(el => el.textContent);
    const secondResult = secondValue.includes('Patrocinados');

    const thirdElementSponsor = await page.waitForSelector('div[data-cel-widget="search_result_3"]');
    const thirdValue = await thirdElementSponsor.evaluate(el => el.textContent);
    const thirdResult = thirdValue.includes('Patrocinados');
    
    const fourthElementSponsor = await page.waitForSelector('div[data-cel-widget="search_result_4"]');
    const fourthValue = await fourthElementSponsor.evaluate(el => el.textContent);
    const fourthResult = fourthValue.includes('Patrocinados');

    let mapImageElements = await page.$$('[class="a-size-base-plus a-color-base a-text-normal"]');

    // Define qual dos resultados da pesquisa é o mais próximo de ser o correto (excluindo os três primeiros anúncios).
    if (firstResult == false){

        await mapImageElements[0].click();

    }else if (secondResult == false){

        await mapImageElements[1].click();

    }else if (thirdResult == false){

        await mapImageElements[2].click();

    }else if (fourthResult == false){

        await mapImageElements[3].click();
        
    }else {

        await mapImageElements[4].click();
    }

    try {
        var avalibeTitle = await page.waitForSelector('span[id="productTitle"]');
        var bookTitle = await avalibeTitle.evaluate(el => el.textContent);
        console.log('O título do livro é '+bookTitle);
    }catch{
        console.log('Título não encontrado na página.');
        var bookTitle = "";
    }

    try {
        var avalibleAuthor = await page.waitForSelector('a[class="a-size-base a-link-normal a-text-normal"]');
        var authorName = await avalibleAuthor.evaluate(el => el.textContent);
        console.log('O autor do livro é '+authorName);
    }catch{
        console.log('Nome do autor não encontrado.');
        var authorName = "";
    }

    try {
        // var avaliblePublisher = await page.waitForSelector('');
        var bookElements = await page.waitForXPath('//*[@id="detailBullets_feature_div"]/ul/li[1]/span/span[2]');
        var publisherName = await bookElements.evaluate(el => el.textContent);
        console.log('O nome da Editora é '+publisherName);
    }catch{
        console.log('Nome da editora não encontrado na busca.');
        var publisherName = "";
    }

    try {
        var avalibleLanguage = await page.waitForXPath('//*[@id="detailBullets_feature_div"]/ul/li[2]/span/span[2]');
        var language = await avalibleLanguage.evaluate(el => el.textContent);
        console.log('O idioma do livro é '+language);
    }catch{
        console.log('Idioma do livro não disponível para consulta.');
        var language = "";
    }

    try {
        var avaliblePages = await page.waitForXPath('//*[@id="detailBullets_feature_div"]/ul/li[3]/span/span[2]');
        var pages = await avaliblePages.evaluate(el => el.textContent);
        console.log('O livro tem '+pages);
    }catch{
        console.log('Quantidade de páginas não encontrada na busca.');
        var pages = "";
    }

    await browser.close();

    catalogue(bookTitle,authorName,pages,publisherName,language);

    console.log("FIM");
}

bookFinder("anjos e demonios");