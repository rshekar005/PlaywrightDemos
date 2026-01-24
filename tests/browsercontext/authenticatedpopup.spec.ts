import {test,expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'


test("handling authenticated popup demo",async ({})=>{
    const browser=await chromium.launch();
    const context=await browser.newContext({httpCredentials:{username:'admin',password:'admin'}});
    const page=await context.newPage();

    //Approach 1: passing username and password in url -- Not recommended
   /* await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState(); // Wait for page loaded completed
    await expect(page.locator('text=Congratulations')).toBeVisible();
    await page.waitForTimeout(5000)
    */

    //Approach 2: Passing credentials in context
     await page.goto("https://the-internet.herokuapp.com/basic_auth");
     await page.waitForLoadState(); // Wait for page loaded completed
    await expect(page.locator('text=Congratulations')).toBeVisible();
    await page.waitForTimeout(5000)

    
})