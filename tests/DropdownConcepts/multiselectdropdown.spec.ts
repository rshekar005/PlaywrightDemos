import path from "path";
import test, { Browser, chromium, Page } from "playwright/test";

test('multi select drop down handling' , async()=>{
    let browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    let page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/multiSelectDropdown.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);
  // let selectedValues=page.locator('#fruits').selectOption(['Apple','cherry']);
  let selectedValues=page.locator('#fruits').selectOption(
   [ {index:4},{label: 'Cherry'},{value:'apple'}]
  )
   console.log(selectedValues)
    await page.waitForTimeout(3000); 
    let selectedValues1=page.locator('#fruits').selectOption(
   [ ]
  )
  console.log(selectedValues1)
  await page.waitForTimeout(3000); 
})