import {test, expect} from '@playwright/test'

test("Assertions",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //hard assertions: In any step failed then rest of the steps will not executed.
    /*await expect(page).toHaveTitle('Demo Web Shop2');//failed
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.getByAltText('Tricentis Demo Web Shop')).toBeVisible();*/

    //soft assertions: If we use stop assertion, if any step fialed then rest of the steps will be executed but failed case will be logged.
    await expect.soft(page).toHaveTitle('Demo Web Shop2');//failed
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect.soft(page.getByAltText('Tricentis Demo Web Shop')).not.toBeVisible();

    await page.waitForTimeout(5000)

   

})