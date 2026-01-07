import {test,Page, Browser} from "@playwright/test"
import { chromium } from "playwright"

// To use chaining concept, right click on play button for a test and click on test explorer. 
// It will open playwright at left corner and select pick locator
// There it will open a new browser and enter a required url
// enter playwright in console
test("chaining concept test" ,async()=>{

    const browser: Browser=await chromium.launch({headless: false, channel:'chrome'});
    const page:Page=await browser.newPage();
    await page.goto("https://www.orangehrm.com/en/30-day-free-trial");
    await page.locator("form#Form_getForm >> #Form_getForm_Name").fill("Rajashekar");
    await page.locator("form#Form_getForm >> text=Get Your Free Trial").click();
    await page.waitForTimeout(3000);
})

test("chaining concept test 2" ,async()=>{

    const browser: Browser=await chromium.launch({headless: false, channel:'chrome'});
    const page:Page=await browser.newPage();
    await page.goto("https://www.orangehrm.com/en/30-day-free-trial");
    const form=page.locator('form#Form_getForm');
    const getNameOfTheButton=page.getByRole('button', {name:'Get Your Free Trial'});

    await form.locator(getNameOfTheButton).click();
    await page.waitForTimeout(3000);

})