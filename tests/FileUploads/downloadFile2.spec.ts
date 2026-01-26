import {test,expect} from "@playwright/test"
import fs from 'fs';

test('download text file',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');

    await page.getByLabel('Enter Text:').fill('Welcome');
    await page.getByRole('button', {name:'Generate and Download Text File'}).click();
    const downloadButton=page.locator('#txtDownloadLink').nth(0);
    expect(downloadButton).toBeVisible();

    //We have written event handler to look for download and clicking on download button. Both are in synchronus , to make to asynchronous we used promise.all() and it returns one contant variable

    const [download]=await Promise.all([
                        page.waitForEvent('download'),
                        downloadButton.click()
                    ]);
                    
    //Save the file in custom path
    const downloadpath="downloads/testfile.txt";
    await download.saveAs(downloadpath);
    
    //check if file exists in the path. For that we have to import fs(File system)
    const fileexists=fs.existsSync(downloadpath);
    expect(fileexists).toBeTruthy();
    

    //clean up downloaded files
    if(fileexists){
        fs.unlinkSync(downloadpath);
    }
    await page.waitForTimeout(5000)
})


test.only('download pdf file',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');

    await page.getByLabel('Enter Text:').fill('Welcome');
    await page.getByRole('button', {name:'Generate and Download PDF File'}).click();
    const downloadButton=page.locator('#pdfDownloadLink').nth(0);
    expect(downloadButton).toBeVisible();

    //We have written event handler to look for download and clicking on download button. Both are in synchronus , to make to asynchronous we used promise.all() and it returns one contant variable

    const [download]=await Promise.all([
                        page.waitForEvent('download'),
                        downloadButton.click()
                    ]);
                    
    //Save the file in custom path
    const downloadpath="downloads/testfile.pdf";
    await download.saveAs(downloadpath);
    
    //check if file exists in the path. For that we have to import fs(File system)
    const fileexists=fs.existsSync(downloadpath);
    expect(fileexists).toBeTruthy();
    

    //clean up downloaded files
    if(fileexists){
        fs.unlinkSync(downloadpath);
    }
    await page.waitForTimeout(5000)
})