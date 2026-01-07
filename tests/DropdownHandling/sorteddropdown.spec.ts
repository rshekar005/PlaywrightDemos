import {expect, Locator, test} from "@playwright/test";

test("verify dropdown is sorted", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // const dropdownOptions:Locator=page.locator("#colors>option"); -- Not sorted
    const dropdownOptions:Locator=page.locator("#animals>option");  // Sorted
    console.log(await dropdownOptions.allTextContents());
    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(e => e.trim());
    const originalList:string[]=[...optionsText]; // Here we used spread operator to make original string as immutable. If we don't have spread operator, sort() will change originalString[]
    const sortedList:string[]=[...optionsText].sort();

    console.log('Original List', originalList);
    console.log('Sorted List', sortedList);

    expect(originalList).toEqual(sortedList);
})