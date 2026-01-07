import {expect, Locator, test} from "@playwright/test";

test("Verify single select dropdown",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1) Select option from the drop down -- 4ways
   /* await page.locator("#country").selectOption("India") //visible text
    await page.locator('#country').selectOption({value:'australia'}) // select by value
    await page.locator('#country').selectOption({label:'India'}) // select by label
    await page.locator('#country').selectOption({index:3})  //select by index
    await page.waitForTimeout(5000)
    */

    //2. check number of dropdowns
    const dropdownOptions:Locator=page.locator('#country option');
    await expect(dropdownOptions).toHaveCount(10);
   

    //3. check an option present in dropdown
    const optionsText:string[]=await dropdownOptions.allTextContents(); // Here it return an array of string with whitespaces
    const newOptionsText:string[]=optionsText.map((e)=>e.trim());
    console.log(newOptionsText)
    expect(newOptionsText).toContain('Japan')
    await page.waitForTimeout(5000)

    //4 Printing options from dropdown
    for(const str of newOptionsText){
        console.log(str)
    }


})