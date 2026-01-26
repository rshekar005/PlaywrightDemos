import {test,expect} from "@playwright/test"

test("Keyboard actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Focus on input 1
    await page.locator('#input1').focus(); // We can use click method also
    //2. Provide the text input1
    await page.keyboard.insertText('welcome')
    //3. CTRL + A -- select the text from input1
   /* await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('Control');
    */

    await page.keyboard.press('Control+A')

    //4. Ctrl + C -- copy the text from input1
    /*await page.keyboard.down('Control');
    await page.keyboard.down('C');
    await page.keyboard.up('Control');*/

    await page.keyboard.press('Control+C')
    //5. Press tab -- 2times
    await Promise.all([page.keyboard.press('Tab'), page.keyboard.press('Tab')]);
    //6. Ctrl +V -- Paste the text ininput2
    /*await page.keyboard.down('Control');
    await page.keyboard.down('V');
    await page.keyboard.up('Control');*/
    await page.keyboard.press('Control+V')
    //7. Press tab -- 2times
     await Promise.all([page.keyboard.press('Tab'), page.keyboard.press('Tab')]);
    //8.  Ctrl +V -- Paste the text ininput2
    /*await page.keyboard.down('Control');
    await page.keyboard.down('V');
    await page.keyboard.up('Control');*/
     await page.keyboard.press('Control+V')

    await page.waitForTimeout(5000)
})