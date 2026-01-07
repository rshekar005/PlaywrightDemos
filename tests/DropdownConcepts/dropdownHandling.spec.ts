
import { test,chromium, Browser,Page } from "@playwright/test";

test("select based dropdown handling", async()=>{
    const browser:Browser=await chromium.launch({headless: false, channel:'chrome'});
    const page:Page=await browser.newPage();
    await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");
    const countryDropdown='select#Contact_CountryCode';
    await page.waitForSelector(countryDropdown);
    //await page.selectOption(countryDropdowm,{value:'AD'});
    //select by label
    //await page.selectOption(countryDropdown,{label:'Australia'})

    //select by index
   // await page.selectOption(countryDropdown,{index:10});

    //In selenium we have findelements method to find all elements with same locator name
    //But in playwright we have to use $$ which is used to find all elements 
    const options=await page.$$(countryDropdown + '> option');
    console.log("length of the country drop down "+options.length);

    for(const e of options){ 
        const text=await e.textContent();
        console.log(text)
        if(text==='India'){
            await page.selectOption(countryDropdown,{label:text});
            break;
        }
    }
    await page.waitForTimeout(5000);
    await browser.close();

    
})