import {expect, Locator, test} from "@playwright/test";

test("Verify single select dropdown",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1) Select option from the drop down -- 4ways
   /* await page.locator('#colors').selectOption(['Red','Blue','Green']); // By visible text
    await page.locator('#colors').selectOption(['red','green','white']); // By using value
    await page.locator('#colors').selectOption([{label: 'Red'}, {label: 'Blue'}, {label: 'Green'}]); // By using label
    await page.locator('#colors').selectOption([{index: 0}, {index: 2}, {index: 4}]);
*/
    await page.waitForTimeout(5000)

    //2. check number of dropdowns
    const dropdownOptions:Locator=page.locator('#colors>option');
    await expect(dropdownOptions).toHaveCount(7)
   

     //3. check an option present in dropdown
    const optionsText:string[]=await dropdownOptions.allTextContents(); // Here it return an array of string with whitespaces
    const newOptionsText:string[]=optionsText.map((e)=>e.trim());
    console.log(newOptionsText)
    expect(newOptionsText).toContain('Green')
    await page.waitForTimeout(5000)

    //4 Printing options from dropdown
    newOptionsText.forEach(e=> console.log(e))


})