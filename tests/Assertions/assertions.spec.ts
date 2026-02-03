import {test, expect} from '@playwright/test'

test("Assertions",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    /*
        - Auto retreiving assertions are mailny used on locators or pages and are asynchronous, 
         which means they return a Promise, so you must use await.
         it uses the default assertion timeout, in timeout is not declared in expect conditions. If decalared it uses that only.
         If auto reties fails then it throws timeout exception. 
         Below are the examples of auto-retreiving assertions where we asserting on locator

    */
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/")
    const welcomeMessage= page.getByRole("heading", {name:'Welcome to our store'});
    await expect(welcomeMessage).toBeVisible();
    await expect(page.locator('.product-grid.home-page-product-grid strong')).toHaveText('Featured products');


    /*
        Non retrying assertion(No waits, no retry, executed immediately. These are synchronus in nature it won't return any promise. So no await is required.
        These assertions are mainly used on values like string, int, boolean values.
        Below are the examples.

    */
    const title=await page.title();
    expect(title.includes('Demo Web Shop')).toBeTruthy();

    const welcometext= await welcomeMessage.textContent();
    expect(welcometext).toContain('Welcome');

    /*
        Negating matcher: You can invert an assertion using .not.
        it applies both on auto retry and no-auto retry mechanism
    */
    await expect(page.getByRole("heading", {name:'Welcome to our store'})).not.toBeVisible();
    expect(welcometext).not.toContain('Welcome');

})