import {test, Locator , expect} from "@playwright/test"
test("verify bootstrap dropdown", async ({page})=>{
    await page.goto('https://www.booking.com/');

    await page.getByTestId('searchbox-dates-container').click();

    // ======= check in date selection =========
    let checkInYear:string='2026';
    let checkInMonth:string='June';
    let checkInDate:string='20';


    // Navigate through the calendar to find the desired check in month and year
    while(true){
        const currentMonthYear=await page.locator("h3[aria-live='polite']").first().innerText();
        const currentMonth= currentMonthYear.split(" ")[0];
        const currentYear= currentMonthYear.split(" ")[1];

        if(currentMonth===checkInMonth && currentYear===checkInYear){
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    //Select the specific check in date
    let allDates:Locator[]=await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
    let checkInDateSelected=false;
    for(let dt of allDates){
        const dateText=await dt.innerText();
        if(dateText===checkInDate){
            await dt.click();
            checkInDateSelected=true;
            break;
        }
    }

     expect(checkInDateSelected).toBeTruthy();

     // ======= check out date selection =========
    let checkOutYear:string='2026';
    let checkOutMonth:string='September';
    let checkOutDate:string='20';


    // Navigate through the calendar to find the desired check in month and year
    while(true){
        const currentMonthYear=await page.locator("h3[aria-live='polite']").nth(1).innerText();
        const currentMonth= currentMonthYear.split(" ")[0];
        const currentYear= currentMonthYear.split(" ")[1];

        if(currentMonth===checkOutMonth && currentYear===checkOutYear){
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    //Select the specific check in date
    let allDatesIncheckout:Locator[]=await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
    let checkOutDateSelected=false;
    for(let dt of allDatesIncheckout){
        const dateText=await dt.innerText();
        if(dateText===checkOutDate){
            await dt.click();
            checkOutDateSelected=true;
            break;
        }
    }

    expect(checkOutDateSelected).toBeTruthy();

    await page.waitForTimeout(5000)



})