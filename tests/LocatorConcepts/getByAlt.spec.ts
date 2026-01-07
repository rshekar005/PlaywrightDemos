import {test, Page, Browser} from '@playwright/test'
import { chromium } from '@playwright/test'
import path from 'path';

// Here this locator which check for alt attribute. We can see this attribute for img and area tags.
test('getByAlt -- tests' , async()=>{
    const browser:Browser=await chromium.launch({headless: true, channel:'chrome'});
    const page:Page=await browser.newPage();
    await page.goto("https://www.cvshealth.com/");
    const altVal=await page.getByAltText("CVS Health logo").nth(1).getAttribute('alt')// Here alt text is "CVS Health logo"
    console.log(altVal);
    await page.waitForTimeout(5000);
})

test('getByAlt -- area tests' , async()=>{
    const browser:Browser=await chromium.launch({headless: false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/area.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    const hrefVal=await page.getByAltText("North America").getAttribute('href');
    await page.goto(hrefVal!);
    await page.waitForTimeout(5000);
})