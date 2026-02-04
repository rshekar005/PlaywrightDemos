/*
    only --Runs only this test and skips all others. Useful for debugging a specific test.
    skip --Skips the test entirely. The test will not run, and Playwright will show it as skipped
    fail --Marks a test as expected to fail. If it passes, Playwright will highlight it as unexpected success.
    fixme --Marks a test that needs to be fixed. The test is automatically skipped.
    slow --Increases the timeout for this test. Useful when you know a test takes longer than usual.
*/


import {test,expect} from "@playwright/test"

test.skip("test1", async({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})

//skip
test.skip("test2", async({page})=>{
    await page.goto("https://www.facebook.com/login/");
    await expect(page).toHaveTitle("Log in to Facebook");
})

//skip based on condition
test.skip("test3", async({page, browserName})=>{
    test.skip(browserName==='firefox','this test skipped if browser is firefox')
    await page.goto("https://www.facebook.com/login/");
    await expect(page).toHaveTitle("Log in to Facebook");
})


//fail
test.fail("test4", async({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})

//fixme
test.fixme("test5", async({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
    //No assertion
})

//slow
test("test6", async({page})=>{
    test.slow(); //It triples the default timeout
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})