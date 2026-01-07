import {test,Locator} from "@playwright/test"

test('Validate comparing methods', async ({page})=>{

    await page.goto('https://demowebshop.tricentis.com');

    //1) Innertext -- Returns visible, rendered text. Eliminates whitespaces. It return only string
    //2) textContent -- Returns raw DOM text,  Includes hidden text , spaces etc...It returns string | null

    const options:Locator=page.locator('.product-title');
    console.log(await options.nth(1).innerText()); //Output:Build your own computer 
    console.log(await options.nth(1).textContent());//Output:            Build your own computer


    console.log("******************* using innertext() **********************")
    for(let i=0;i<await options.count();i++){
        console.log(await options.nth(i).innerText());
    }


    console.log("******************** using textContent() *********************")
    for(let i=0;i<await options.count();i++){
        const productName: string | null= await options.nth(i).textContent();
        console.log(productName?.trim) // ? operator is used because it can return string or null
    }


    console.log(" ******************** allInnertext() vs alltextContent() ********************** ")
    const productNames: string[]= await options.allInnerTexts();
    console.log(productNames)

    const productNamesUsingTextContent: string[]= await options.allTextContents();
    console.log(productNamesUsingTextContent.map(e => e.trim())) //Here we are removing whitespaces before and after string using trim methods


    console.log("****************************** all ******************************")

    const productLocators:Locator[]=await options.all(); // Converts Locator ------ Locator[]
    console.log(productLocators);

    console.log(await productLocators[3].innerText());

    //for of loop
    for(let product of productLocators){
        console.log(await product.innerText())
    }


    // for in loop -- Uses index concept . Here i represents an index in productLocators
    for(let i in productLocators){
        console.log(await productLocators[i].innerText());
    }


})