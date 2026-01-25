/*
    Playwright by default tries to do automatic scroll. Therefore you don't need to scroll. This is not applicable for infinte scroll

*/

import {test, expect} from '@playwright/test'

test("Scroll to footer", async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    const footerDisclaimer=await page.locator('.footer-disclaimer').innerText();
    console.log(footerDisclaimer)
})

test("Scroll inside dropdown", async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#comboBox').click();
    const option=page.locator('#dropdown div:nth-child(100)');
    console.log("Option captured from dropdown ",await option.innerText());
    await option.click();

})


test.only("Scroll inside table", async ({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');
    const name=await page.locator('#example tbody tr:nth-child(10) td:nth-child(2)').innerText();  //Vertical scroll
    console.log("Last name from 10th row & 2nd column ",name);

    const email=await page.locator('#example tbody tr:nth-child(10) td:nth-child(9)').innerText();  //Horizontal scroll
    console.log("Email from 10th row & 9th column ",email);

    await page.waitForTimeout(5000)

})