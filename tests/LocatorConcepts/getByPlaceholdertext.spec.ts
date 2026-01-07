// It works for any placeholder present for input , textcontent. But make sure place holder value is unique other wise use another locator strategy
// for input type=date then getByPlaceHolder won't work but we can see 
// It will use contains internally

import { Page, Browser} from "@playwright/test"
import test from "node:test";
import { chromium } from "playwright"

test("getByPlaceholder" , async()=>{
 const browser:Browser= await chromium.launch({headless:false , channel:'chrome'})
 const page:Page=await browser.newPage();
  await page.goto('file:///D:/playwrightdemo/htmlinks/placeholder.html');
  await page.getByPlaceholder("enter your full name").fill("Rajashekar");
  await page.getByPlaceholder("example@domain.com").fill("rs@gmail.com")

  await page.waitForTimeout(5000);
})
