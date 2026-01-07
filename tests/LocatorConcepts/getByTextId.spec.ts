import {test, expect, Page, Browser, selectors} from "@playwright/test"
import { chromium } from "@playwright/test"
import path from "path";
import { Selectors } from "@playwright/test";

test("getByTextID -- test" , async() =>{

    const browser:Browser=await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page=await browser.newPage();
    const filePath = path.resolve('htmlinks/getByTestID.html');
    const fileUrl = new URL(`file://${filePath}`);
    await page.goto(fileUrl.href);

    // Id and data-testid both are not same. data-testid is a custom attribute. It can be anyname but should start from data-"<anyname>"
    const loginButton:string=await page.getByTestId('login-button').innerText();
    console.log(loginButton);

    //Here custom attribute name is different (i.e data-qa). In this case we need to configure id using below Selectors
    selectors.setTestIdAttribute('data-qa'); //Instead of this we can set this attribute in playwright.config.ts file under use parameter
    const registerButton:string=await page.getByTestId('register-button').innerText();
    console.log(registerButton);




})