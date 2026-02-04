import {test,expect, Page} from '@playwright/test'

/*
    Scenario 1: Login into app, find the number of products and logout
    Scenario 2: Login into app , add a product to cart and logout

*/
let page:Page;

test.beforeAll('Open app', async({browser})=>{
    page=await browser.newPage();
    await page.goto('https://demoblaze.com/index.html');
})


test.afterAll('close app', async({})=>{
    await page.close();
})

test.beforeEach('Login', async()=>{
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavano1');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
})

test.afterEach('Logout', async()=>{
    await page.getByRole('link', { name: 'Log out' }).click();
})


test("No of products", async()=>{
   const productsCount:number=await page.locator("#tbodyid .hrefch").count();
   console.log("Number of products: ",productsCount)
   expect(productsCount).toBe(9);
})


test("Add products to card",async()=>{
    await page.locator("text='Samsung galaxy s6'").click();

    //Handle dialog
    page.on("dialog", async(dialog)=>{
        console.log("Type of alert :",dialog.type());
        const message:string=dialog.message();
        console.log("Message :",message);
        expect(message).toContain("Product added");
        await dialog.accept();
    })

    await page.getByRole('link', { name: 'Add to cart' }).click();
})