import {test, expect} from "@playwright/test"

test("Autowaiting and forcing",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //Here we are overriding the default timeout of actions. Default is 30 sec now updating with 5 sec
    test.setTimeout(5000);

    //Assertions : autowait for 5 seconds. But in script updating to wait till 10 sec 
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/", {timeout: 10000})
    const welcomeMessage= page.getByRole("heading", {name:'Welcome to our store'});
    await expect(welcomeMessage).toBeVisible({timeout: 10000});


    //Actions ; autowait for 30 sec.It not found throws Timeout error. If we use force optional value then it won't wait for 30 sec. It increases performance of automation
    await page.locator('#small-searchterms').nth(0).fill('laptop', {force:true}); // 
    await page.locator('.button-1.search-box-button').click({force:true})// If we won't use force parameter here it wait whether element visible, enabled,stable and retrieve events.
 
})