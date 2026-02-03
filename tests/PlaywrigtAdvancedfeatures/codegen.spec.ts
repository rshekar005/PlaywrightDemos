import { test, expect } from '@playwright/test';

/*
    Codegen in Playwright is a built-in tool that automatically generates test code based on your actions in the browser. We can call it has test runner.

    Commands:
    1. npx playwright codegen https://example.com --> This will open playwright inspector tool along with this URL in seperate browser windoe
    2. npx playwright codegen -o tests/mytest.spec.ts  --> Generates the recorded script and saves it to a specific file path.
    3. npx playwright codegen --device "iPhone 15"    --> Start recording in the emulated view of a specific device.

    We have different commands(like execute in specific browser, viewport etc) look for pavan pdf.
    We can do assertion using codegen option which we see beside record buttons. We can do assert on visible, using text, using snapshot etc..

    Command for debug:
    npx playwright test tests/mytest.spec.ts --debug --> It will open playwright inspector tool as well as browser. From there we can debug.
    using the same playwright tool we can generate locator also by clicking on inspect option , in locator tab(button) we will find out the element


*/
test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavano1');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome');
});