import { expect, test , Locator, Page } from "@playwright/test";

async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:boolean){
while(true){
    const currentMonth=await page.locator('.ui-datepicker-month').textContent();
    const currentYear=await page.locator('.ui-datepicker-year').textContent();

    if(currentMonth===targetMonth && currentYear=== targetYear){
        break;
    }
    if(isFuture){
            await page.locator('.ui-datepicker-next.ui-corner-all').click();  // future
    }else{
            await page.locator('.ui-datepicker-prev.ui-corner-all').click();  // past
    }
   }
   const allDates= await page.locator('.ui-datepicker-calendar td').all();
   for(let dt of allDates){
    const dateText= await dt.innerText();
    if(dateText===targetDate){
        await dt.click();
        break;
    }
   }
}

test("Verify JQuery dropdown", async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dateInput:Locator=page.locator('#datepicker');
    expect(dateInput).toBeVisible();

   // await  dateInput.fill('06/01/2026'); --> Approach 1 when it is input field
  
   // Past
//    const year='2023';
//    const month='January';
//    const date='27';

//Future
    const year='2027';
   const month='January';
   const date='27';

   await dateInput.click();
   selectDate(year,month,date,page,true) // Future=true, past=false
   
   //const expectedDate:string='01/27/2023';
    const expectedDate:string='01/27/2027';
   await expect(dateInput).toHaveValue(expectedDate);
   await page.waitForTimeout(5000);

})

