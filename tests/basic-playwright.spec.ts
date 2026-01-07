import { test, expect } from '@playwright/test';

// Basic Playwright test for beginners
// This test opens the Playwright website and checks the page title

test('basic test - check page title', async ({ page }) => {
  // Navigate to the Playwright website
  await page.goto('https://playwright.dev/');

  // Get the page title
  const title = await page.title();

  // Assert that the title contains 'Playwright'
  expect(title).toContain('Playwright');
});
