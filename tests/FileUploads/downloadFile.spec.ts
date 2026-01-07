import test, { Browser, chromium, Page } from "playwright/test";

test('upload files', async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel:'chrome'});
    let page:Page=await browser.newPage();
    await page.goto("https://limewire.com/d/BZcyQ#Mr212g1CwT");
    const downloadPromise= page.waitForEvent('download');// Event which will check for download and returns promise
    await page.getByRole('button', {name:'Download'}).nth(0).click(); // Click on download button
    const download=await downloadPromise;
    const fileName=download.suggestedFilename();
    console.log(fileName);
    await download.saveAs('mytests\\downloads\\' +fileName);
    await page.waitForTimeout(5000)
})