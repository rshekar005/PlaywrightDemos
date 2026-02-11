import {test,expect} from '@playwright/test'
const searchItems:string[]=['laptop','Gift card', 'smartphone', 'monitor']

// using for of loop
/*for(const item of searchItems){
    test(`search for product ${item}`, async ({page})=>{
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);
        await page.getByRole('button', {name:'Search'}).click();
        const text:string=await page.locator('h2 a').textContent()??'';
        console.log(text)
        expect(text?.toLowerCase()).toContain(item);
    })
}*/


//using foreach  -- Works for single dimention array
/*searchItems.forEach((item)=>
test(`search for product ${item}`, async ({page})=>{
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);
        await page.getByRole('button', {name:'Search'}).click();
        const text:string=await page.locator('h2 a').textContent()??'';
        console.log(text)
        expect(text?.toLowerCase()).toContain(item);
    })
)
*/
//using describe
test.describe('searching tests', async()=>{
    searchItems.forEach((item)=>
        test(`search for product ${item}`, async ({page})=>{
                await page.goto('https://demowebshop.tricentis.com/');
                await page.locator('#small-searchterms').fill(item);
                await page.getByRole('button', {name:'Search'}).click();
                const text:string=await page.locator('h2 a').textContent()??'';
                console.log(text)
                expect(text?.toLowerCase()).toContain(item);
            })
    )

})