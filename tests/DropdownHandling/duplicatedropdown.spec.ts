import {expect, Locator, test} from "@playwright/test";

test("verify duplicate dropdown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //const dropdownOptions:Locator=page.locator("#colors>option"); // Having duplicates
    const dropdownOptions:Locator=page.locator("#animals>option"); //No duplicates
    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(e => e.trim());
    const mySet=new Set<string>(); // Duplicates not allowed
    const duplicates:string[]=[]; // Allows duplicates

    for(const text of optionsText){
        if(mySet.has(text)){
            duplicates.push(text)
        }else{
            mySet.add(text);
        }
    }

    console.log("Duplicate options are ", duplicates); 
    expect(duplicates.length).toBe(0);
})