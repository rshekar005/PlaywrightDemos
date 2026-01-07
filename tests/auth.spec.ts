import {test, expect, Page, Browser, BrowserContext, firefox} from "@playwright/test"
import { chromium} from "playwright"

test(('auth test') , async()=>{
    const browser:Browser=   await firefox.launch({headless:false})
    const browsercontext:BrowserContext=await browser.newContext();
    const page:Page=await browsercontext.newPage();
    // await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth"); //Not Recommended

    // We have a method in js called btoa where we need to pass username and password. It will create a basic authentication string
    const username='admin';
    const password='admin';
  //  const authHeader= btoa(username+':'+password);
    await page.setExtraHTTPHeaders({Authorization : createAuthHeader(username, password)});// It will pass authorization as a header to url
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
 
    //await new Promise(()=>{});

});

function createAuthHeader(username:any, password:any){
    return 'Basic '+ btoa(username+':'+password);
}