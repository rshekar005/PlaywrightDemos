import {expect, Locator, test} from "@playwright/test";

test("Text input actions", async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameField:Locator=page.locator("#name");
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();
    const maxlength:string | null=await nameField.getAttribute('maxlength');
    expect(maxlength).toBe('15');
    await nameField.fill("john cena");
    // console.log("text content of name field is: " + await nameField.textContent()); --> it returns nothing as there is no text node inside input field
    const enteredValue:string=await nameField.inputValue();
    console.log("value of name field is :" + enteredValue); // Returns the value entered in the input field
    expect(enteredValue).toBe("john cena");

    await page.waitForTimeout(3000)

})

test("Radio button actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio:Locator=page.locator("#male");
    await expect(maleRadio).toBeEnabled();
    await expect(maleRadio).toBeVisible();

    expect(await maleRadio.isChecked()).toBe(false);

    await maleRadio.check(); //Selecting Radio button
      await page.waitForTimeout(3000)

    expect(await maleRadio.isChecked()).toBe(true); // Here comparing both the values
   await expect(maleRadio).toBeChecked(); //Here we are expecting it to be true. Preferable
  
})


test.only("check box actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //1. Select specific checkbox using getByLable and assert
    const sundayCheckbox:Locator=page.getByLabel("Sunday"); // To use this locator it should have lable tag in DOM
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await page.waitForTimeout(3000)
    await sundayCheckbox.uncheck();   //Uncheck
    await page.waitForTimeout(3000)


    //2. Select all checkbox and assert each is checked
    const days:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const checkboxes:Locator[]=days.map(e => page.getByLabel(e));

    expect(checkboxes.length).toBe(7); // Asserting number of checkboxes
   
    for(let checkbox of checkboxes){    // Here all 7 checkboxes are selected
       await checkbox.check();
       await expect(checkbox).toBeChecked(); //toBeChecked() will check for true value
      
    }

     await page.waitForTimeout(3000);

     // 3. Select Last 3 checkboxes and assert
    for(const checkbox of checkboxes.slice(-3)){ // Here last 3 checkboxes will unselect using slice() method
    await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked(); // Use not.toBeChecked(). it means it check for false
        await page.waitForTimeout(3000);
    }

    // 4. Select checkboxes which are selected and unselect checkboxes which are selected
    for(const checkbox of checkboxes){
        if(await checkbox.isChecked()){
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }else{
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(3000);

    //5. Randomly select checkbox --> select checkboxes by index (1,3,6) and assert
    const indexs:number[]=[1,3,6];
    for(const i of indexs){
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }

    //6. Select lable based on label
    const weekname:string="Monday";
    for(const label of days){
        if(label.toLowerCase()===weekname.toLowerCase()){
           const checkbox:Locator= page.getByLabel(label);
           await checkbox.check();
           expect(checkbox).toBeChecked()
        }
    }

})