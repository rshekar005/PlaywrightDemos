import {test, expect, Browser, Page, Locator} from "@playwright/test"
import { log } from "console";
import path from "path";
import { webkit, chromium, firefox } from "playwright"

test("locator test", async() =>{
    //Below myBrowser is a variable and it's type is Browser
   const mybrowser:Browser= await chromium.launch({headless:false, channel:'chrome'});
   const mypage:Page=await mybrowser.newPage();
   await mypage.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

   //create a webelement(locator) using Locator and then perform actions(click, fill etc..)
   //1. ID is always a unique
   const firstName:Locator= mypage.locator('id=input-firstname');
   const lastName:Locator=mypage.locator('id=input-lastname');

   // For creating a locator no need to add await but performing an action await is needed
   await firstName.fill("Rajashekar");
   await lastName.fill("Automation labs")

   //2. Using classname -- imp don't use class='img-responsive' it will fail
   const logo:Locator=mypage.locator('.img-responsive');
   const logoExist:boolean=await logo.isEnabled();
   console.log("Logo enabled :"+logoExist)

   //3. Using text -- It can be used for any text element(button, link, text...)
   const header:Locator= mypage.locator('text=Register Account')//text
   const headerExist:boolean=await header.isEnabled();
   console.log("Header enabled :"+headerExist)

   const button:Locator= mypage.locator('text=Continue')//button
   const buttonExist:boolean=await button.isEnabled();
   console.log("button enabled :"+buttonExist)

   const forgotPassword:Locator= mypage.locator('text=Forgotten Password')//link
   const forgotPasswordExist:boolean=await forgotPassword.isEnabled();
   console.log("forgot password link enabled :"+forgotPasswordExist);

   //4. css -- whenever we use css we can use css as prefix or not. By default playwright consider it as css/xpath. It is good practice to use css as prefix
   const email:Locator=mypage.locator('css=input#input-email');//Using ID
   const telephone:Locator=mypage.locator('input[name="telephone"]'); //Using attribute without css prefix
   const checkbox:Locator=mypage.locator('css=input[type="checkbox"]'); //Using attribute

   await email.fill("pr@gmail.com");
   await telephone.fill("1234567");
   await checkbox.click();

   //5. xpath --selects elements based on query
   const password:Locator=mypage.locator('xpath=//input[@id="input-password"]');//Using ID
   const search:Locator=mypage.locator('//input[@name="search" and @type="text"]');

   await password.fill("123456");
   await search.fill("Macbook");

await mypage.waitForTimeout(3000);   
});


// To the locator we can pass optional values like has, hasText, hasNot and hasNotText.
//hastext and hasNotText : Filters elements by text content
// has and hasNot :Find an element that has a specific child or content
test("locator test with optional values" , async() =>{

    const browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/traditionLocators.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    
    await page.locator('button', {hasText:'login'}).click()// here login is a text and button is tag. Text is case sensitive and we can pass partial value or inner text
   

   await page.locator('fieldset', {hasNot:page.getByLabel('male')}).click();

   await page.waitForTimeout(5000);
})