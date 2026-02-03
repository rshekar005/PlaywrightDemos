import {test, expect} from "@playwright/test"

test('screenshot demo', async ({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');

    const timestamp=Date.now();

    //Page screenshot
    await page.screenshot({path:'tests/Screenshots/'+timestamp+'homepage.png'})

    //Full Page screenshot
    await page.screenshot({path:'tests/Screenshots/'+timestamp+'fullpage.png', fullPage: true})

    //Element screenshot
    await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'tests/Screenshots/'+timestamp+'logo.png'})

    await page.locator('.product-grid.home-page-product-grid').screenshot({path:'tests/Screenshots'+timestamp+'features.png'})

})

test.only('screenshot demo from config', async ({page})=>{

  await page.goto('https://demoblaze.com/');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavano1');
  await page.locator('#loginpassword').fill('test@11123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome');
})