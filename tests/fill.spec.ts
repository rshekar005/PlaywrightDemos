import test, { Browser, chromium, Page } from '@playwright/test';
import path from 'path';

/*
    By default fill method will clear the existing value.
    If you wont want to clear the existing then use pressSequentially method
*/
test('Fill test' , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/textbox.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    await page.getByRole('textbox',{name:"Enter your name:"}).fill("Rajashekar");
     /*await page.getByRole('textbox',{name:"Enter your name:"}).fill("Pillalamarri");*/

     await page.getByRole('textbox',{name:"Enter your name:"}).pressSequentially("Pillalamarri",/*{delay: 1000}*/);

    // await page.getByRole('button',{name:'NotATextBox'}).fill('Raja', {force: true});
    // await page.getByRole('textbox',{name:'Disabled input'}).fill("Raja");
    await page.getByRole('textbox',{name:'Input with max 10 characters:'}).fill("RajashekarPillalamarri")
    
    /* We cannot use fill method if we use getByRole with date locator as it is date component
    await page.getByRole('Date',{name:'Choose a date:'}).fill('20-07-2025')*/

    /* We cannot use fill method with value as '20-07-2025' it throws malformed value because it accept value as YYYY-MM-DD
    await page.locator('#native-date').fill('20-07-2025');*/

     await page.locator('#native-date').fill('2025-07-20');

     await page.getByRole('textbox', {name:'Enter date (MM/DD/YYYY):'}).fill('07-20-2025')
    await page.waitForTimeout(5000);


    
})