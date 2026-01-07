import test, { Browser, chromium, Page } from "playwright/test";

test('drag and drop ', async()=>{
    const browser:Browser=await chromium.launch({headless:false,channel:'chrome'});
    const page:Page=await browser.newPage();
    await page.goto('https://jqueryui.com/droppable/');

    //switch to frame
    const frameElement=page.frameLocator('iframe[class="demo-frame"]');
    frameElement.locator('#draggable').dragTo(frameElement.locator('#droppable'))


    await page.waitForTimeout(5000);
})