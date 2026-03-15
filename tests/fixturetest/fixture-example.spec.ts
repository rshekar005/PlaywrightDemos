import { test } from "../../fixtures/fixtures";
import { expect } from "@playwright/test";


// Example 1: Using loginPage fixture
test('Test 1: Using loginPage fixture', async ({ page, loginPage }) => {
    await page.goto('https://demoblaze.com/index.html');
    
    await loginPage.clickLoginlink()
        .then(lp => lp.enterUserName('pavano1'))
        .then(lp => lp.enterPassword('test@123'))
        .then(lp => lp.clickOnLoginButton());

    // Assert login was successful
    await page.waitForSelector('#nameofuser');
    const welcomeText = await page.locator('#nameofuser').textContent();
    expect(welcomeText).toContain('Welcome pavano1');
});


// Example 2: Using homePage fixture
test('Test 2: Using homePage fixture', async ({  homePage }) => {
    // homePage already navigated to the site
    // Now just use the homePage methods directly

    await homePage.addToCartProduct('Nokia lumia 1520')
            .then(hp=>hp.clickOnAddToCarT())
            .then(hp => hp.clickCartLink());


});


// Example 3: Using authenticatedPage fixture (already logged in)
test('Test 3: Using authenticatedPage fixture (pre-authenticated)', async ({ authenticatedPage, homePage }) => {
    // User is already logged in, no need to login again
    await authenticatedPage.waitForSelector('#nameofuser');
    const welcomeText = await authenticatedPage.locator('#nameofuser').textContent();
    expect(welcomeText).toContain('pavano1');
    
    // Now test adding to cart
    await homePage.addToCartProduct('Nokia lumia 1520');
    await homePage.clickOnAddToCarT();
    await homePage.clickCartLink()
});


// Example 4: Using testData fixture
test.only('Test 4: Using testData fixture', async ({ page, loginPage, testData }) => {
    await page.goto('https://demoblaze.com/index.html');
    
    await loginPage.clickLoginlink()
        .then(lp => lp.enterUserName(testData.username))
        .then(lp => lp.enterPassword(testData.password))
        .then(lp => lp.clickOnLoginButton());

    await page.waitForSelector('#nameofuser');
    const welcomeText = await page.locator('#nameofuser').textContent();
    expect(welcomeText).toContain(testData.username);
});


// Example 5: Using multiple fixtures together
test('Test 5: Using multiple fixtures together', async ({ 
    page, 
    loginPage, 
    homePage, 
    testData 
}) => {
    await page.goto('https://demoblaze.com/index.html');
    
    // Login using credentials from testData
    await loginPage.clickLoginlink()
        .then(lp => lp.enterUserName(testData.username))
        .then(lp => lp.enterPassword(testData.password))
        .then(lp => lp.clickOnLoginButton());

    await page.waitForSelector('#nameofuser');
    const welcomeText = await page.locator('#nameofuser').textContent();
    expect(welcomeText).toContain(testData.username);
    // Add product using testData product name
    await homePage.addToCartProduct(testData.productName);
    await homePage.clickOnAddToCarT();
    
   
});
