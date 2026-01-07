import {test,Locator, expect} from "@playwright/test"

test('Read data from all the pages',async ({page})=>{

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    let hasmorepages=true;

    
    while(hasmorepages){
        const rows:Locator[]=await page.locator('#example tbody tr').all();
        for(let row of rows){
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000)
       const nextButton:Locator=  page.locator('button[aria-label="Next"]');
       const isDisable=await nextButton.getAttribute('class');
       if(isDisable?.includes('disabled')){
        hasmorepages=false;
       }else{
        await nextButton.click();
       }
    }

})


test('Filter the rows and check the rows count',async ({page})=>{

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    const dropdown:Locator=page.locator('#dt-length-0');
    await dropdown.selectOption({label: '25'});
    const rows=await page.locator('#example tbody tr').all();
    expect(rows.length).toBe(25);  // Assertion 1

    const rows2= page.locator('#example tbody tr');
    expect(rows2).toHaveCount(25); // Assertion 2

})

test.only('Search for specific data in a table',async ({page})=>{

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    const search:Locator=page.locator('#dt-search-0');
    await search.fill('Tatyana Fitzpatrick');
      const rows:Locator[]=await page.locator('#example tbody tr').all();
      if(rows.length>=1){
        let matchFound=false;
        for(let row of rows){
            const text=await row.innerText();
            if(text.includes('Tatyana Fitzpatrick')){
                matchFound=true;
                console.log('record exist --- found')
                break;
            }
            expect(matchFound).toBeTruthy(); // Comparing boolean value with true
        }
      }else{
        console.log('No rows found with search text')
      }

})