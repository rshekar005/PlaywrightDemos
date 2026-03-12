/*
    Playwright can be used to test your application for many types of accessiblity issues:
    Examples:
        Missing or imporper ALT text for images
        Poor color contrast
        Missing form lables
        Keyboard Navigation Issues
    
    Every website should follow WCAG guidelines.
        - Web content accessibility guidelines

    To Use accesiblity testing inn playwright we need to install below package
    Install @axe-core/playwright:
        -npm install @axe-core/playwright

    Imp note: Every thing we cannot test by automation. We have to do it via both manaul and automation

    Path where we can see above package:https://www.npmjs.com/package/@axe-core/playwright
*/

import {test, expect} from "@playwright/test"
import AxeBuilder from "@axe-core/playwright";


test("accessibility test", async ({page}, testInfo)=>{
    await page.goto("https://demowebshop.tricentis.com/"); // Seen violations in this page
  // await page.goto("https://www.w3.org/");  //No violations for this page


    // 1-- Scanning to detect all types of WCAG violations.
  /*  const accessiblityResults= await new AxeBuilder({page}).analyze();
    //console.log(accessiblityResults);
    console.log("Number of violations: ", accessiblityResults.violations.length);
    expect(accessiblityResults.violations.length).toEqual(0);*/


    // 2-- Detect specific WCAG violations:

    const accessiblityResults= await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();

    await testInfo.attach('accessibility results',{
                                                          body: JSON.stringify(accessiblityResults,null,2),
                                                          contentType:'application/json'
                                                  });
    console.log("Number of violations: ", accessiblityResults.violations.length);

    expect(accessiblityResults.violations.length).toEqual(0);


})