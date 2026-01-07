import {test, Locator} from "@playwright/test";

test("Verify bootstrap drop down", async ({page})=>{

   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await page.locator("[name='username']").fill('Admin')
   await page.locator("[name='password']").fill('admin123');
   await page.locator("[type='submit']").click();

   await page.getByText('PIM').click() // click using text

   await page.locator('form i').nth(2).click();// Click on 3rd element using nth()
   await page.waitForTimeout(5000)

   const options:Locator=page.locator("div[role='listbox'] span");

   const count=await options.count();
   console.log('Number of dropdowns: ',count);

   for(let i=0;i<count;i++){
    console.log(await options.nth(i).innerText())
   }

    await page.waitForTimeout(5000)

})