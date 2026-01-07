import {test,Page,Browser} from '@playwright/test'
import { chromium } from 'playwright'

test("Mouse hover-- spicejet", async()=>{
    const browser:Browser=await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
     page.goto("https://www.spicejet.com/");
     page.getByText('Add-ons').first().hover();
     page.getByText('Visa Services').first().click();
     await page.waitForTimeout(15000);
})
