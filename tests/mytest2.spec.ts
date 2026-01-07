import {test, expect} from "@playwright/test";

//Fixture -- global variable :page, browser

test('verify page url',async ({page})=>{
    await page.goto("http://www.automationpractice.pl/index.php");
    let title:string=await page.title();
    console.log("Title is ",title);
    await expect(page).toHaveURL("http://www.automationpractice.pl/index.php")
})