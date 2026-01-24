import {test,expect, chromium, Browser, BrowserContext, Page} from '@playwright/test'

// Pages can be new tab, new window, pop up
test("handling multiple tab demo",async ({})=>{

    /*
    if we pass context to function then below lines of code is not required.
        const browser=await chromium.launch();
        const context=await browser.newContext();

    */
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const parentPage=await context.newPage();

    await parentPage.goto('https://testautomationpractice.blogspot.com/');

    /*  Here used promise.all -- 
    ┌─────────────────────────────────────────────┐
    │ Promise.all() starts (parallel execution)   │
    ├─────────────┬───────────────────────────────┤
    │             │                               │
    │ WAITING     │ CLICKING                      │
    │ for new     │ "New Tab"                     │
    │ page event  │ button                        │
    │             │                               │
    │     ✓       │       ✓                      │
    │ Event fired │ Click complete                │
    │             │                               │
    └─────────────┴───────────────────────────────┘
         ↓
   Both promises resolved
         ↓
   Continue execution

   */
    const [childpages]=await Promise.all([
            context.waitForEvent('page'),   // Event 
            parentPage.locator("button:has-text('New Tab')").click()
    ])

    // Aproach 1: switch between pages and get titles. If pages are multiple then prefer this approach
    const pages=context.pages();
    console.log('Number of pages in tab ', pages.length)

    console.log('Title of the parent page ',await pages[0].title())
    console.log('Title of the child page ',await pages[1].title())

    //Approach 2: alternate. If we have only limited pages then this approach is good
    console.log('Title of the parent page ',await parentPage.title())
    console.log('Title of the child page ',await childpages.title())
    
})