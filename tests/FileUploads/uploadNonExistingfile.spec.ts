import test, { Browser, chromium, Page } from "playwright/test";

test('upload non existing file', async()=>{
    let browser:Browser=await chromium.launch({headless:false, channel:'chrome'});
    let page:Page=await browser.newPage();
    await page.goto('https://www.file.io/');

    //Upload plain text file by creating on-the-fly

    // await page.locator('input#select-files-input')
    //             .setInputFiles(
    //                 {
    //                     name:'abc.txt',
    //                     mimeType: 'text/plain',
    //                     buffer: Buffer.from('I am learning playwright')
    //                 }
    //             )

    // Upload json file

// await page.locator('input#select-files-input')
//         .setInputFiles({
//             name:'app.json',
//             mimeType:'application/json',
//             buffer: Buffer.from(JSON.stringify({
//                 'name':'Rajashekar',
//                 'designation':'IT',
//                 'age':'29'
//             }))
//         })

// Upload csv file by creating on-the-fly
await page.locator('input#select-files-input')
        .setInputFiles({
            name:'app.csv',
            mimeType:'test/csv',
            buffer: Buffer.from(    `name, city
                Raja, Warangal
                Vasu, Ponnur`
                )
        })

// Upload csv file
    await page.waitForTimeout(30000)
})