import path from "path";
import test, { Browser, chromium, Page } from "playwright/test";

/*
    In Selenium we use sendKeys method to upload a file if tab contains input as file.
    In the same we can upload files in playwright if input tag is file.
    We can upload multiple files using array if tag as multiple attribute. It means pass number of files in array for setInputFiles().
    Here we can upload directory as well directly.
*/

test('upload files', async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel:'chrome'});
    let page:Page=await browser.newPage();
    await page.goto("https://www.file.io/");

    //Uploading files via absolute path. Here we cannot use '\' in any programming language. Instead we have to use '/' or '\\'
 
    // page.locator("#select-files-input")
    //     .setInputFiles(
    //         ['D:/playwrightdemo/mytests/testData/demoupload.txt',
    //             'D:\\playwrightdemo\\mytests\\testData\\Playwright.png'
    //         ]);


    // await page.locator("#select-files-input")
    //     .setInputFiles(path.resolve('mytests\\testData\\Playwright.png'));

    // Upload directory
    await page.locator('#upload-folder')
            .setInputFiles('mytests/testData');

    await page.waitForTimeout(10000);

})