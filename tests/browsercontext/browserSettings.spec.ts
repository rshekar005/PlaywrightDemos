import {test,expect, chromium, Browser, BrowserContext, Page} from "@playwright/test"

test('browser settings', async()=>{
    const browser:Browser=await chromium.launch({channel: 'chrome', headless: false})
    const browserContext:BrowserContext=await browser.newContext({
        viewport:{width:500, height:800},    // browser size. We can set it in inside the context or global settings(Playwright.config.ts)
        locale:'en-US', //used to set language to the browser
      //  proxy:{server:'http:/myproxy.com:3245'} // settings a proxy
      ignoreHTTPSErrors:true // Used to handle ssl pages which are not secured.

    });
    const page:Page=await browserContext.newPage();
    await page.goto('https://expired.badssl.com/');
    console.log('Title of the page: ',await page.title())
    await page.waitForTimeout(5000)
})