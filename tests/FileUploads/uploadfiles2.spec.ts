import {test,expect} from "@playwright/test"

test("Single file upload", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#singleFileInput').setInputFiles('tests/testData/Playwright.png');
    await page.getByRole('button', {name: 'Upload Single File'}).click();
    const singleFileStatus=await page.locator('#singleFileStatus').textContent();
    expect(singleFileStatus).toContain('Playwright.png');
    console.log("Upload successfully");

    await page.waitForTimeout(5000)
   

})

test.only("Multiple files upload", async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#multipleFilesInput').setInputFiles(
        ['tests/testData/Playwright.png',
        'tests/testData/demoupload.txt']);
    await page.getByRole('button', {name: 'Upload Multiple File'}).click();
    const mutlipleFileStatus=await page.locator('#multipleFilesStatus').textContent();
    expect(mutlipleFileStatus).toContain('Playwright.png');
    expect(mutlipleFileStatus).toContain('demoupload.txt ');
     console.log("Upload successfully");
     console.log(mutlipleFileStatus);
   

    await page.waitForTimeout(5000)
   

})