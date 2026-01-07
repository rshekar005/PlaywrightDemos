import test, { Browser, chromium, expect, Page } from "playwright/test";

test("check uncheck test", async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel:'chrome'});
    let page:Page=await browser.newPage();
   await page.goto("https://www.walgreens.com/login.jsp?ru=%2F");
   await page.locator("#ShowCharacter").check();
    expect(await page.locator("#ShowCharacter").isChecked()).toBe(true);
   await page.waitForTimeout(3000);
   await page.locator("#ShowCharacter").uncheck();
    await page.waitForTimeout(3000);
})