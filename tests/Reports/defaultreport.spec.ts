import {expect, test} from "@playwright/test"

/*
    To Configure allure report do the following:
    1. Install allure report through npm command: It will add dependency in package.json
            npm install -D allure-playwright
    2. Add below line in playwright.config.ts for reporter array
            reporter: 'allure-playwright'
    3. Run any test
    4. It will store results by creating a folder in project called as "allure-results". Here it has json files and images
    5. To open/view allure report do the following:
        a) Execute below line in terminal 
            npm install -g allure-commandline --save-dev
        b) Check where the allure is installed. In my case it is installed in C:\Users\hi\AppData\Roaming\npm\node_modules\allure-commandline\bin
        c) Add above bin path in system variables
    6. Execute below command to generate a allure report in terminal. It generated a folder called allure-report by taking /allure-results folder
        allure generate ./allure-results -o ./allure-report
    7. Now to open allure report execute below command:
        allure open ./allure-report

*/

test.beforeEach('launching page', async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
})

test('Logo test', async ({page})=>{
    await expect(page.getByAltText('Tricentis Demo Web Shop')).toBeVisible();
})

test('title test', async ({page})=>{
    const title:string=await page.title();
    expect(title).toBe('Demo Web Shop2')
})


test('Search product test', async ({page})=>{
    await page.locator('#small-searchterms').fill('laptop');
    await page.getByRole('button', {name:'Search'}).click();
    const productName= page.locator('.product-title a');
    await expect(productName).toContainText('laptop', {ignoreCase: true})


})
