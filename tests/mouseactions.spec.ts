import {test, expect, Browser, chromium, Page} from '@playwright/test'

test("Mouse hover", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('.dropbtn').nth(0).hover(); // Hover on button

    await page.locator('.dropdown-content a:nth-child(1)').click()

    await page.waitForTimeout(5000)

})

test('Right click', async ({page})=>{
     await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

    const btn= page.locator('text=right click me'); // Hover on button

    await btn.nth(0).click({button:'right'}) // right click actions

    await page.waitForTimeout(5000)

})


test('Double click', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/');

    const btn= page.locator('text=Copy Text'); // Hover on button

    await btn.nth(0).dblclick(); // double click actions

    const field=page.locator('#field2');
    expect(field).toHaveValue('Hello World!')
    await page.waitForTimeout(5000)

})

test('Drag and drop', async ({})=>{
    const browser:Browser=await chromium.launch({headless:false,channel:'chrome'});
      const page:Page=await browser.newPage();
      await page.goto('https://jqueryui.com/droppable/');
  
      //switch to frame
      const frameElement=page.frameLocator('iframe[class="demo-frame"]');
      frameElement.locator('#draggable').dragTo(frameElement.locator('#droppable'))
  
  
      await page.waitForTimeout(5000);

})