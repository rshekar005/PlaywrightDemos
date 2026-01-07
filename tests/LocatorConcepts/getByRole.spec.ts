/*
 It follows ARIA -- Accessible Rich Internet APplication. It is a set of roles and attribues that define a ways to make web applications more accessible to people having disabilities.

 How can we find Accessibity
    1. Inspect
    2. Accessibilty(We can find for arrow where it has selectorshub)
    3. Where we can find Role (textbox, radio etc..) and Name
*/

import {test,expect, Page, Browser} from "@playwright/test"
import path from "path";
import {chromium} from "playwright"

test(('getByRole -- test'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    // Absolute file path
    const filePath = path.resolve('htmlinks/traditionlocators.html');
    // Convert to file URL
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    // getByRole is a method is playwright. Here username is an input field so role name is 'textbox' and accessibity name is 'username'.
    // If field is checkbox then role should be checkbox and accessbility should be checkbox accessibity name
    // It accepts two arguments 1. Role and 2. Options ("Accesibitlity") which is optional
    await page.getByRole('textbox',{name: 'Username:'}).fill('Amod Mahajan');
    await page.getByRole('checkbox', {name: 'Subscribe to newsletter'}).click();
    await page.waitForTimeout(5000);
})
 
test(('getByRole -- checked'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getRoleChecked.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    // For belwo checkbox we can find attribute as "checked". SO validating from code where checkbox is checked or not. And then getting value of name attribute
   let name= await page.getByRole('checkbox', {checked: true}).getAttribute("name");
   console.log("Value of name attribute is "+name)
   //For unchecked checkbox with optional value checkbox as false. Here it will find two elements. So it throws an error.
   // Using nth method it will resolve an issue
   // checked is an optional value
   let name2= await page.getByRole('checkbox', {checked: false}).nth(0).getAttribute("name");
   console.log("Value of name attribute is "+name2)
    await page.waitForTimeout(5000);
})

test(('getByRole -- disabled'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getRoleID_disabled.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    let disabledText=await page.getByRole("button",{disabled: true}).innerText();// Disable is an optional value.We can "disable" attribute for button tag
    console.log("Text of a button is "+disabledText)

    //Below button is role and actual name is Disable Checkbox. But here written Disable , it means it acts as contains text. It want to check whether "Disable" is full name then use exact which return true/false.
    //Here i have passed true. It means it will check exact complete name in accebility.
    // name and exact is an optional value in getByRole() locator
    var count=await page.getByRole('button', {name: 'Disable' , exact: true}).count();
    console.log("Count of disabled button is "+count)// It will print 0.
    await page.waitForTimeout(5000);
})

test(('getByRole -- expanded'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByRole_expanded.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    let expandedableText=await page.getByRole("button",{expanded: false}).innerText();// expanded is an optional value
    console.log("Text of a button is "+expandedableText)
})


test(('getByRole -- hiddenElement'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByRole_hidden.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    let count=await page.getByRole("button",{includeHidden: true}).count()// includeHidden is an optional where it will check button hidden when none of them is selected. 
    console.log("count  of disabled button is "+count)
    await page.waitForTimeout(5000);
})

test(('getByRole -- level test'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByRole_level.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    let count=await page.getByRole("heading",{level: 2}).count()// Here heading is a role and level 2( means heading 2). We are finding count of elements which matches with heading 2.
    console.log("count  of Heading with leavel 2 is : "+count)
    await page.waitForTimeout(5000);
})

test(('getByRole -- pressed test'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByRole_pressed.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    let text:string=await page.getByRole("button",{pressed: false}).innerText()//here button is not preseed. So optional value pressed is false
    console.log("Text which is not pressed : "+text)
    await page.waitForTimeout(5000);
})

test(('getByRole -- selected test'), async()=>{
    const browser:Browser =await chromium.launch({headless:false, channel:'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByRole_selected.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
    await page.locator('text=Tab 2').nth(0).click();// clicking on tab 2
    let text:(string|null)=await page.getByRole("tab",{selected: true}).textContent();// Here checking tab 2 is selected and getting a text value.
    console.log("Selected : "+text)
    await page.waitForTimeout(5000);
})

