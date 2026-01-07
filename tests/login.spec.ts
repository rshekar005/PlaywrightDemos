/*
Steps:
1. Open the browser (chrome/firefox.safari etc..)
2. Open page
3. Enter url
4. create three locators (username, password and submit button)
5. Enter username
6. Enter password
7. click login button
8. get the home page title
9. verify title
10. take screenshot
11. close the browser.

*/

import {test, expect, Browser, Page, Locator} from "@playwright/test"
import { webkit, chromium, firefox } from "playwright"

test("login test", async() =>{
    //Below myBrowser is a variable and it's type is Browser
   const mybrowser:Browser= await chromium.launch({headless:false, channel:'chrome'});
   const mypage:Page=await mybrowser.newPage();
   await mypage.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  
   //Using below line we can locate a element. Here #input-email is my css locator. It will return locator.
   const email:Locator=await mypage.locator('#input-email');
   const password:Locator=await mypage.locator('#input-password');
   const loginButton:Locator=await mypage.locator("[value='Login']");

   //Actions
   await email.fill("dec2024@opencart.con");
   await password.fill("Selenium@12345");
   await loginButton.click();

   //capture title
    const title:string=await mypage.title();
    console.log("Title of the page is "+title);

    // Take screenshot
    await mypage.screenshot({path: 'homepage.png'})

    //Validations
    expect(title).toEqual('My Account');

    //close the browser
    await mybrowser.close();


});