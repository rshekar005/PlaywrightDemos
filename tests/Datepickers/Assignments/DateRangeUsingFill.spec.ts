import {test, Locator, expect} from '@playwright/test'

test('Select date using fill', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#start-date').pressSequentially('01012026')
    await page.locator('#end-date').pressSequentially('31122026');

    await page.waitForTimeout(5000)

})