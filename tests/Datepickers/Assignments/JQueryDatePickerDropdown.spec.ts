import {test, Locator, expect} from '@playwright/test';

test("Verify JQuery datepicker -- Dropdown", async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("input[name='SelectedDate']").click();
    await expect(page.locator('#ui-datepicker-div')).toBeVisible();

    await page.locator('.ui-datepicker-year').selectOption('2016'); // Select by text
    await page.locator('.ui-datepicker-month').selectOption('11'); // Select Using Value

    const dates:Locator[]=await page.locator('.ui-datepicker-calendar tbody tr td').all();

    const selectDate:string='31';

    for(let date of dates){
        const d=await date.innerText();
        if(d===selectDate){
            await date.click();
        }
    }

    await page.waitForTimeout(5000)


})