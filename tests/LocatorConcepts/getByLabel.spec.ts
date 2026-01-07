
import {test, Page, Browser} from "@playwright/test"
import path from "path";
import { chromium } from "playwright"

test(('getBylabel -- HappyPath -- Test ') , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByLabelPlaceholderText_HappyPath.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    // Here label name is "First Name:". It will remove white spaces front and back of a text. input tag is inside label tag. So it worked
    await page.getByLabel('First Name:').fill("Rajashekar");
    await page.getByLabel('Last Name:').fill("Pillalamarri");
    await page.waitForTimeout(5000);

})

test(('getBylabel -- 1 -- Test ') , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByLabelPlaceholderText_Case2.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
   // Here label name is "First Name:". It will remove white spaces front and back of a text. input tag is outside of label tag. So it won't worked for getByLabelPlaceholderText_Case1.html. 
   
    await page.getByLabel('First Name:').fill("Rajashekar");
    // For getByLabelPlaceholderText_Case2.html also input tag is out of label tag but label tag uses for attribute. So it worked
    await page.getByLabel('Last Name:').fill("Pillalamarri");
    await page.waitForTimeout(5000);

})
