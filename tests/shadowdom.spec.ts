/*
   In selenium we cannot directly handle shadow elements. There we cannot use selenium locators
   But in playwright all locators work for shadow elements except xpath.

*/
import {test,expect} from "@playwright/test"

test('shadow dom',async ({page})=>{
    await page.goto('https://books-pwakit.appspot.com/');

    await page.locator('#input').fill('Playwright automation');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    const booksFound=await page.locator('h2.title').all();
    console.log('Number of books ',  booksFound.length)
    expect(booksFound.length).toBe(20)

})


test.only('shadow dom 2',async ({page})=>{
    await page.goto('https://shop.polymer-project.org/');

   await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();
   await page.waitForTimeout(5000);
   const productsFound=await page.locator('div.title').all();
   console.log('Number of products ',productsFound.length)

   expect(productsFound.length).toBe(16)
})
