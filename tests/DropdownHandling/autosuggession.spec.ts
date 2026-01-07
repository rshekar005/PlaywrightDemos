import {Locator, test} from "@playwright/test";

test("verify autosuggession", async ({page})=>{
   await page.goto("https://www.flipkart.com/");
   await page.locator("[name='q']").fill('Vi');
   await page.waitForTimeout(5000)

   const options:Locator=page.locator("ul>li");
   
   // Print number of options
   const count=await options.count();
   console.log("Count: ", count);

   //Print any selected index value
  console.log("Value at 5th index is ",await options.nth(5).innerText());  // Here used innertext because we are capturing value not content.

  //Using allInnerTexts to print all values at once
    await options.allInnerTexts().then((values)=>{
      console.log("All values are: ", values);
    });
  //Printing all auto suggession
  for(let i=0;i<count;i++){
    //console.log(await options.nth(i).innerText()) //Innertxt : It will remove all the extra spaces and line breaks.
    console.log(await options.nth(i).textContent()) //textContent: It will capture the exact content with spaces and line breaks.

  }

  for(let i=0;i<count;i++){
    const text=await options.nth(i).textContent();
    if(text==="vivo t4 5g"){
        await options.nth(i).click();
        break;
    }
  }
  await page.waitForTimeout(5000)
})