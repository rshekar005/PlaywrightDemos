import path from "path";
import test, { Browser, chromium, expect, Page } from "playwright/test";

test('css test' , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/cssPseudo.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);

    // In selenium we cannot find locator with css text. But in Playwright we can find it using text()
    // Matching is case insensitive
  //  await expect(page.locator('div:has-text("Home")')).toBeVisible();// It will check for a tag which is having Home as text.
 

  // has-text -- will search for smallest element. It also case insensitive
  /*await expect(page.locator('div :text("Home")')).toBeVisible();
     let con=await (page.locator('css=div :text("Home")').evaluate(e=>e.tagName)); 
   console.log(con)*/

   //text-is is case sensitive
  await expect(page.locator('a:text-is("Home")')).toBeVisible();


  //text-matched uses regular expression
  console.log(await page.locator('button:text-matches("Log.?in","i")').allInnerTexts());//Here we have two buttons Login and log in. So used regular expression with ?
  await page.waitForTimeout(5000);

})