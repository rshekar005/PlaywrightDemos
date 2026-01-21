import {test, Locator, expect, Page} from '@playwright/test'

async function selectDate(targetMonth:string, targetYear:string, targetDate:string, page:Page){
    await expect(page.locator('#ui-datepicker-div')).toBeVisible();
    await page.locator('.ui-datepicker-month').selectOption({label:targetMonth});
    await page.locator('.ui-datepicker-year').selectOption({value:targetYear});
    const allDates:Locator[]=await page.locator('.ui-datepicker-calendar tbody tr td').all();
    for(let date of allDates){
        const getDate:string= await date.innerText();
        if(getDate===targetDate){
            await date.click();
            break;
        }
    }
}
test('Verify dummy ticket booking', async ({page})=>{
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
    const radioButtons:Locator[]=await page.locator('#checkout-products li').all();
    for(let radioButton of radioButtons){
        let radio:string= await radioButton.innerText();
        if(radio.includes('Dummy ticket for Visa Application')){
            await radioButton.locator('label').click();
            break;
        }
    }
    await page.locator('#travname').fill('Akash');
    await page.locator('#travlastname').fill('Ratore');
    await page.locator('#dob').click();
    await selectDate('Nov','2026','25',page);

    await page.getByRole('radio',{name:'Male', exact: true}).click();

    const flag:boolean=await page.locator('#traveltype_1').isChecked();
    console.log('One way trip is selected :', flag);
    if(flag===false){
        await page.locator('#traveltype_1').click();
    }

    await page.locator('#fromcity').fill('Toronto');
    await page.locator('#tocity').fill('Mumbai');
    await page.locator('#departon').click();
    await expect(page.locator('#ui-datepicker-div')).toBeVisible();
    await selectDate('Dec','2026','31',page);
    
    console.log('Depart on date :',await page.locator('#departon').inputValue());
    expect(await page.locator('#departon').inputValue()).not.toBeNull();
    await page.locator('#notes').fill('Need visa as soon as possible');
    const value:string=await page.locator('#select2-reasondummy-container').innerText();
    if(value.includes('Visa application')){
    }else{
        await page.locator('#select2-reasondummy-container').click()
        const options:Locator[]=await page.locator('.select2-results__option').all();
        for(let option of options)
             {
                 console.log(await option.innerText())
                 if((await option.innerText()).includes('Visa application')){
                    await option.click();
                    break;
                 }
             }
    }
    await page.locator('#appoinmentdate').click();
    await selectDate('Dec','2024','10',page);
    await page.getByRole('radio',{name:'Email'}).click();

    await page.locator('#billname').fill('Akash Rathore');
    await page.locator('#billing_phone').fill('+12345678956');
    await page.locator('#billing_email').fill('abc.123@gmail.com');
    await page.getByRole('combobox', {name: 'Country'}).click();
    const contryList:Locator[]=await page.locator('#select2-billing_country-results li').all();
    for(let country of contryList){
        const con:string=await country.innerText();
        if(con.includes('Canada')){
            await country.click();
            break;
        }
    }
    await page.getByPlaceholder('House number and street name').fill('123 Scott Street L2C 6M1');
    await page.getByRole('textbox', {name:'Town / City'}).fill('Niagara Falls');
    await page.getByRole('combobox', {name:'State / District / Province'}).click();
    const stateList:Locator[]=await page.locator('#select2-billing_state-results li').all();
    for(let state of stateList){
        const con:string=await state.innerText();
        if(con.includes('Ontario')){
            await state.click();
            break;
        }
    }
    await page.getByRole('textbox',{name:'Postcode'}).fill('L2C 6M1');
    const actualResult:string=await page.locator('#order_review .product-details').innerText();
    expect(actualResult).toBe('Dummy ticket for Visa Application');
    const actualCost:string= await page.getByRole('cell', {name:'₹1,200'}).nth(2).innerText();
    expect(actualCost).toBe('₹1,200');
    await page.waitForTimeout(5000)
})