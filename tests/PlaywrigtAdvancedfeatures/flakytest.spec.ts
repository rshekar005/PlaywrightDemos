import {test,expect} from '@playwright/test'

/*
1. Configure in playwright.config.ts file:
    You can set how many times to retry a failed test like this:
    export default defineConfig({
    retries: 3, // This will retry a failed test up to 3 times
    });
2. Or Use CLI (Command Line Interface):
    You can also set retries while running your tests from the terminal:
    # Run all tests with 3 retry attempts
        npx playwright test --retries=3
    # Run a specific test file with retries
        npx playwright test tests/flakytest.spec.ts --retries=3


*/
test.only('Flaky test -- retry',async ({page,context})=>{

  await page.goto('https://demoblaze.com/');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavano1');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(10000)
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome');
})