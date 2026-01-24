import {test,expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'


test("handling multiple popups demo",async ({})=>{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');
    await Promise.all([
           page.waitForEvent('popup'),   // Event 
           await page.locator("#PopUp").click()
    ])

   
    const allpopups=context.pages();
    console.log('Number of pages in tab ', allpopups.length);

    console.log(allpopups[0].url())
    console.log(allpopups[1].url())
   // console.log(allpopups[2].url())

    for(const popup of allpopups){
        const title= await popup.title();
        if(title.includes('Playwright')){
            await popup.locator('.getStarted_Sjon').click();
             await page.waitForTimeout(5000)
            // Perform any operations
            await popup.close()
        }
    }

    await page.waitForTimeout(5000)
   
    
})