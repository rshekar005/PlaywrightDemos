import {test,expect} from '@playwright/test'
/*
 We can trace everything in 3 types:
 1 Using playwright.config.ts : trace: 'on-first-retry' or 'on' or 'off' -- automatically sets to HTML report
 2 using execution command: npx playwright test tracing.spec.ts --headed  --trace on  (-- automatically sets to HTML report)
 3 Using Programatically context.tracing.start() and context.tracing.stop()
   1. To open trace file which genereted by code then we have to open zip file using below command
   npx playwright show-trace logs.zip 
    2. We can open via online also : https://trace.playwright

*/
test.only('tracing demo from config', async ({page,context})=>{
context.tracing.start({
    screenshots: true,
    snapshots: true
})
  await page.goto('https://demoblaze.com/');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavano1');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome');

  context.tracing.stop({path:'logs.zip'})
})