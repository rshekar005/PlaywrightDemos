import test, { Browser, chromium, Page } from "playwright/test";

test('Handle single select dropdown', async()=>{
    let browser:Browser=await chromium.launch({headless:false, channel:'chrome'});
    let page:Page=await browser.newPage();
    await page.goto('https://www.amazon.com/gp/help/customer/account-issues/ref=unified_claim_collection?ie=UTF8');
    let selectedValue=await page.locator('#cu-select-firstNode').selectOption({label:'I forgot my password'});
    console.log(selectedValue);
    await page.waitForTimeout(5000);
    //To deselect we can have do by passing empty array, but it is not recommended. We have to select default option or refresh the page
    let selectedValue1=await page.locator('#cu-select-firstNode').selectOption([]);
    console.log(selectedValue1);
    await page.waitForTimeout(5000);
})