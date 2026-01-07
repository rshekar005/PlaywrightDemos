import {test,expect, Locator} from "@playwright/test"
import { exitCode } from "node:process";
import { text } from "node:stream/consumers";

/*
        1. page.getByAltText() to locate an element, usually image by its text alternative
        2. page.getByText() to locate by text content(Non interactive elements)
        3. page.getByRole() to locate by explicit and implicit accessibility attributes
        4. page.getByLabel() to locate a form control associated label's text
        5. page.getByPlaceholder() to locate an input by placeholder
        6. page.getByTitle() to locate an element by its title attribute
        7. page.getByTestId() to locate an element based on its data-testid attribute
*/
test("Verify Playwright locators",async({page})=>{
    await page.goto("http://127.0.0.1:5500/tests/app.html");

   // 1.  page.getByAltText()
   const logo:Locator=  page.getByAltText("logo image", {exact: true});
   await expect(logo).toBeVisible({timeout: 2000});


   /*
   2. page.getByText() -- Find an element by the text it contains. You can match by a subsctring, exact string.
      locate by visible text
      Use this locator to find non intercative elements like div, span, p etc 
      For interactive elements like button, a , input , etc use role locators.
   */

      const text:Locator=page.getByText("List item 1", {exact: true});
    //  const text:Locator=page.getByText(/Welcome\s+to\s+our\s+store/i, {exact: true});   Using Regular expression
      await expect(text).toBeVisible();


      /*
    3. page.getByRole()  -- Locating by role(role is not an attribute)
    Role locators include buttons, checkboxes, links, lists, tables and many more which follow w3c specifications for ARIA role
    Prefer for interactive elements like buttons, checkboxes, links, lists, headings , tables etc...
      */

    const primaryButton= page.getByRole('button', {name:'Primary Action'});
    await expect(primaryButton).toBeVisible();
    const ele= page.getByRole('link', {name:'Home'})
   // await expect(ele).toBeVisible();
   // await expect(page.getByRole('heading', {name:'Register'})).toBeVisible();


    /*
        4. page.getBylabel() -- Locate form control by label's text
        When to use -- Ideal for form fields with visible lables

    */

      await page.getByLabel('Email Address:').fill('John')
      await page.getByLabel('Password:').fill('Kennedy');
      await page.getByLabel('Your Age:').fill('20');

      /*
        5. page.getByPlaceHolder()  -- Finds an element with a given placeholder text
        Best for inputs without a label but having a placeholder
      */

        await page.getByPlaceholder("Enter your full name").fill('Rajashekar')

      /*
         6. page.getByTitle() to locate an elements by its title attribute
        // When to use : When your element has a meaningful title attribute
      */

        const title=page.getByTitle('HyperText Markup Language');
        expect(title).toBeVisible();

      /*
        7. page.getByTestId() -- Locate an element based on its data-testid attribute
        When to use: When your element has a data-testid attribute
      */

    await page.getByTestId('edit-profile-btn').click();


})