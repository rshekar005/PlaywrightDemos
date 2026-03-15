import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

// Define custom fixture types
type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    authenticatedPage: Page;
    testData: {
        username: string;
        password: string;
        productName: string;
    };
};


// Extend base test with custom fixtures
export const test = base.extend<MyFixtures>({
    // loginPage fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage); 
        // Cleanup (runs after test)
    },

    // homePage fixture
    homePage: async ({ page }, use) => {
        await page.goto('https://demoblaze.com/index.html');
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginlink()
        .then(lp => lp.enterUserName('pavano1'))
        .then(lp => lp.enterPassword('test@123'))
        .then(lp => lp.clickOnLoginButton());

        const homePage = new HomePage(page);
        await use(homePage);
        // Cleanup
    },

    // authenticatedPage fixture - logs in before test
    authenticatedPage: async ({ page }, use) => {
        await page.goto('https://demoblaze.com/index.html');
        
        const loginPage = new LoginPage(page);
        await loginPage.clickLoginlink()
            .then(lp => lp.enterUserName('pavano1'))
            .then(lp => lp.enterPassword('test@123'))
            .then(lp => lp.clickOnLoginButton());

        //await page.waitForLoadState('networkidle');
        await use(page);
    },

    // testData fixture
    testData: async ({ }, use) => {
        const data = {
            username: 'pavano1',
            password: 'test@123',
            productName: 'Samsung galaxy s6'
        };
        await use(data);
    }
});

export { expect } from "@playwright/test";
