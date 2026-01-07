
import test, { Browser, chromium, Page } from "playwright/test";
import {addMonths, format} from "date-fns"

test('select date based on low rates', async()=>
{
       const browser:Browser= await chromium.launch({channel:'chrome', headless: false} );
       const page:Page=await browser.newPage();
       await page.goto("https://www.yatra.com/");

       await page.getByRole('button',{name:'Departure Date inputbox'}).click();
       await page.waitForSelector("div[aria-current='date']:has-text('₹')") //Waiting for the element to load rupee symbol
       const yearMonth=format(new Date(), 'yyyy-MM');
       const yearNextMonth= format(addMonths(new Date(),1), 'yyyy-MM');
       const currentMonth= page.getByRole('listbox', {name:`month ${yearMonth}`});
       console.log(currentMonth)

       const currentMonthDates= currentMonth.locator("div[role='option'][aria-disabled='false']:not([class*='outside-month'])");
       const fares= currentMonthDates.locator('span:text("₹")') // custom psudo locator which is having span with text as ₹.
       const allfares=await fares.allInnerTexts();
       console.log(allfares);
       const allformatedrates=allfares.map(fare => parseInt(fare.replace(/\D/g,''),10));// Removing non-digit character.\D = matches any non-digit character. g = global flag (replace all matches)
       const minFare=Math.min(...allformatedrates);
       console.log(minFare);
       const formattedMinfare='₹' + minFare.toLocaleString('en-IN');
       console.log(formattedMinfare)

       const dateWithMinFare=await currentMonthDates.filter({hasText:formattedMinfare});
       const con= await dateWithMinFare.count();

       const index=Math.floor(Math.random() * con);
       await dateWithMinFare.nth(index).click();




})