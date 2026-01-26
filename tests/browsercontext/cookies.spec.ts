import {test,expect, chromium, Browser, BrowserContext, Page} from "@playwright/test"

test('cookies settings', async()=>{
    const browser:Browser=await chromium.launch({channel: 'chrome', headless: false})
    const browserContext:BrowserContext=await browser.newContext();
    browserContext.addCookies(
        [{name:'mycookie',
          value:'123456', 
          url:'https://testautomationpractice.blogspot.com/'
        }])
    const page:Page=await browserContext.newPage();
    await page.goto('https://testautomationpractice.blogspot.com/');
    //Get the details of the cookie
    const allCookies=await browserContext.cookies();
    const retrievedCookie=allCookies.find((c)=>c.name==='mycookie');
    console.log("Printing cookie details: ",retrievedCookie)
    expect(retrievedCookie?.value).toBe('123456');
    expect(retrievedCookie?.value).toBeDefined();

    //Get all the cookies
    console.log("Total number of cookies ",allCookies.length)
    await page.waitForTimeout(5000)
})