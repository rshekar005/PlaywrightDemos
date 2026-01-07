/*
✅ Key Points about Browser Contexts:
•	Isolated environment: Separate cookies, storage, cache, localStorage, and sessionStorage
•	Faster than launching a new browser each time
•	You can create multiple contexts in a single browser instance
•	Each context can have multiple tabs/pages

🔧 Use Cases:
•	Simulating multiple users logged in at once
•	Running parallel tests in the same browser
•	Keeping tests clean and independent from each other

Example: 2 Different users wants to access same page. One is admin user and another customer.

In Selenium, we will login into page with admin and do some changes and then logout. Then close the browser.
Again we have to open a same page then login with customer user and update some details and logout. Then close the browser.
Again we have to open a same page with admin and check the customer changes and then close the browser.

Drawback: Here we cannot open same browser instance with multiple users.

Using playwright we can achieve this drawback using Browser context. 
It means each time when we open a new browser instance using context doesn’t maintain storage/cookie of another instance of same browser.

*/

import {test, expect, Browser, Page, Locator, BrowserContext} from "@playwright/test"
import { webkit, chromium, firefox } from "playwright"

test("browsercontext test", async() =>{
   
   const mybrowser:Browser= await chromium.launch({headless:false, channel:'chrome'});

   //Browsercontext1
   const myBrowserContext_1:BrowserContext=await mybrowser.newContext();
   const page_1:Page=await myBrowserContext_1.newPage();

    //Browsercontext2
    const myBrowserContext_2:BrowserContext=await mybrowser.newContext();
    const page_2:Page=await myBrowserContext_2.newPage();
  
    //Browser1
   await page_1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
   const email1:Locator=await page_1.locator('#input-email');
   const password1:Locator=await page_1.locator('#input-password');
   const loginButton1:Locator=await page_1.locator("[value='Login']");

   await email1.fill("dec2024@opencart.con");
   await password1.fill("Selenium@12345");
   await loginButton1.click();
    

    //Browser2
   await page_2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
   const email2:Locator=await page_2.locator('#input-email');
   const password2:Locator=await page_2.locator('#input-password');
   const loginButton2:Locator=await page_2.locator("[value='Login']");

   await email2.fill("rajpwt@gamil.com");
   await password2.fill("playwright@123");
   await loginButton2.click();

   await page_1.waitForTimeout(5000); // Optional: Pause to observe the page
   await page_2.waitForTimeout(5000);


   myBrowserContext_1.close();
   myBrowserContext_2.close();

   mybrowser.close();





});