import {test, expect, Locator} from "@playwright/test"

test('Visual test', async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
   // await page.goto('https://demowebshop.tricentis.com/register') -- To check visual testing working fine then uncomment this and comment above URL
    // Compare snapshot of the page
    //approach --1 -- If there is no screenshot with homepage.png. First time it will create a screenshot with this name. When we run second time it will check the created screenshot.
   // expect(await page.screenshot()).toMatchSnapshot('homepage.png')

    //approach --2  -- It is same as above but here there is no name. It will create a screenshot in this file folder. When we run second time it will check the created screenshot.
    //await expect(page).toHaveScreenshot();

    //Compare snapshot of particular element
    const logo:Locator=page.getByAltText('Tricentis Demo Web Shop');
    await expect(logo).toHaveScreenshot("logo.png");


})