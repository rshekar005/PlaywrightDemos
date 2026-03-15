# Playwright Fixtures Guide

This folder contains custom Playwright fixtures that help set up and tear down test resources.

## Files

### `fixtures.ts`
Defines custom fixtures that extend Playwright's base test object:

- **`loginPage`** - LoginPage instance ready to use
- **`homePage`** - HomePage instance with navigation to the app
- **`authenticatedPage`** - Page already logged in as a user
- **`testData`** - Object containing test credentials and data

## Usage

### Import fixtures in test files
```typescript
import { test, expect } from "../fixtures/fixtures";
```

### Using a single fixture
```typescript
test('My test', async ({ loginPage, page }) => {
    // loginPage is already initialized
    await loginPage.clickLoginlink();
});
```

### Using multiple fixtures
```typescript
test('My test', async ({ authenticatedPage, homePage, testData }) => {
    // authenticatedPage - already logged in
    // homePage - navigated to home
    // testData - test credentials available
    
    await homePage.addToCartProduct(testData.productName);
});
```

## Benefits

✅ **Reusability** - Define setup once, use in multiple tests  
✅ **Cleaner tests** - Less boilerplate code  
✅ **Centralized data** - Manage test data in one place  
✅ **Automatic cleanup** - Fixture teardown runs after each test  
✅ **Pre-authenticated state** - Login once with authenticatedPage fixture  

## Examples

See `fixture-example.spec.ts` for 5 different examples of using fixtures.

## Running tests with fixtures

```powershell
npx playwright test fixtures/
```
