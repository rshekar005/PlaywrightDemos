import {test, expect, Locator} from "@playwright/test"

test("Flight Booking Assignment", async ({page})=>{

    await page.goto("https://blazedemo.com/");
    const departuredropdown:Locator= page.locator("[name='fromPort']");
    const todropdown:Locator=page.locator("[name='toPort']");
    await departuredropdown.selectOption({value: 'Boston'});
    await todropdown.selectOption({label:'London'})
    await page.getByRole("button",{name:'Find Flights'}).click()
    const rows:Locator[]=await page.locator('.table tbody tr').all();
    let price:string[]=[];
    for(let row of rows){
        const priceText = await row.locator('td', {hasText:'$'}).textContent();
        if(priceText) price.push(priceText);
    }

    console.log("Total number of available flights ",price.length)
    console.log(price)
    await page.waitForTimeout(5000)

    const sortedPrice=[...price].sort();
    console.log(sortedPrice[0])

    for(let i=0;i<rows.length;i++){
         const priceText = await rows[i].locator('td', {hasText:'$'}).textContent();
         if(priceText===sortedPrice[0]){
            await rows[i].locator("input[type='submit']").click();
            break;
         }
    }

    await page.getByPlaceholder('First Last').fill('John');
    await page.getByRole('textbox',{name:'Address'}).fill('1403 American Beauty Ln');
    await page.locator('#city').fill('Columbus');
    await page.locator("input[name='state']").fill('OH');
    await page.locator('#zipCode').fill('43240');
    await page.locator('#creditCardNumber').fill('6789 0673 4523 1267');
    await page.locator('#creditCardYear').fill('2023');
    await page.locator('#nameOnCard').fill('John Canedy');

    await page.locator('.btn.btn-primary').click();

    const confirmMessage: string =await page.getByRole('heading',{name:'Thank you for your purchase today!'}).innerText();
    expect(confirmMessage).toContain('Thank you for your purchase');







})