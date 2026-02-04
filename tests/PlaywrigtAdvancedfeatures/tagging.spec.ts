/*
    1. Run all sanity tests:
        npx playwright test tagging.spec.ts --grep "@sanity"
    2. Run all regression tests:
        npx playwright test tagging.spec.ts --grep "@regression"
    3. Run tests which are belongs to both sanity & regression
        npx playwright test tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"
        (?=.*@sanity) ensures the tag @sanity is present.
        (?=.*@regression) ensures the tag @regression is also present.
        Combined, it matches tests that include both tags.
    4. 4. Run tests belongs to either sanity or regression.
        npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression"
    5. Run only sanity tests which are not belongs to regression
        npx playwright test tests/tagging.spec.ts --grep "@sanity" --grep-invert "@regression"

*/

import {test, expect} from '@playwright/test'

/*  -- Not recommended ----------
test("@sanity @regression check title of the page",async ({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})
    */

test("check title of the page",{tag:'@sanity'},async ({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");
})

test("check title of the store page",{tag:'@regression'},async ({page})=>{
    await page.goto("https://www.google.com");
    await page.locator("text='Store'").click()
    await expect(page).toHaveTitle("Google Store for Google Made Devices & Accessoroes");
})


test("check top recommendations",{tag:['@sanity','@regression']},async ({page})=>{
    await page.goto("https://www.google.com");
    await page.locator("text='Store'").click()
    await expect(page.locator("text='Our Top Recommendations.'")).toHaveText('Our Top Recommendations.')
})