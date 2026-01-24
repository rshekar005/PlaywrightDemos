import {test,expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'

// Pages can be new tab, new window, pop up
test("browser context demo",async ({})=>{

    /*
    if we pass context to function then below lines of code is not required.
        const browser=await chromium.launch();
        const context=await browser.newContext();

    */
    const browser1=await chromium.launch();
    const context1=await browser1.newContext();
    const page1= await context1.newPage();
    await page1.goto('https://playwright.dev/');
    await expect(page1).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
    await page1.waitForTimeout(5000)

    const browser2=await chromium.launch();
    const context2=await browser2.newContext();
    const page2= await context2.newPage();
    await page2.goto('https://www.selenium.dev/');
    await expect(page2).toHaveTitle('Selenium')
    await page1.waitForTimeout(5000)
})