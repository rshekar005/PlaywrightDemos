import  {test, Browser, chromium, Page, expect } from "@playwright/test";
import path from "path";

test(('getByText-- Examples ') , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByText.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
   // Here it will check for a text available in page and expecting it is visible. It will be case insensitive if we don't use exact parameter
   await expect (page.getByText("Hello World", {exact: true})).toBeVisible();
  //Today is 2025-04-05. Here date is dynamic. So handling it via regular expression
   await expect (page.getByText(/^Today is \d{4}-\d{2}-\d{2}$/)).toBeVisible();
   console.log(new Date().toISOString());//Here it will print date with time.
   let today= new Date().toISOString().split('T')[0] //Here spliting with T to get only date.
   console.log(today);
   // await expect (page.getByText(`Today is ${today}`)).toBeVisible();
   // For trimmed string, getByText will remove white spaces
   await expect (page.getByText("Trimmed text here")).toBeVisible();

   expect(page.getByText("This is a paragraph with multiple lines and some extra spaces.", {exact: true})).toBeVisible();

})
