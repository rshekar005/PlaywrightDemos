/**
 * @file parameterdemo2.spec.ts
 * @description Data-Driven Login Test Suite using Playwright
 * 
 * This test file demonstrates parameterized/data-driven testing approach where the same
 * test logic is executed multiple times with different sets of input data. It tests a
 * login functionality with various valid and invalid credentials to ensure the
 * application behaves correctly in different scenarios.
 * 
 * KEY CONCEPTS:
 * - Data-Driven Testing: Separating test data from test logic
 * - 2D Array Structure: Using multi-dimensional arrays to organize test parameters
 * - Template Literals: Dynamic test names based on test data
 * - Conditional Assertions: Different validations based on expected outcomes
 * 
 * @author Playwright Learning
 * @version 1.0
 */

import {test, expect, Locator} from "@playwright/test"

/**
 * Test Data: 2D Array containing login credentials and expected outcomes
 * 
 * Structure: [email, password, validity]
 * - email (string): User email address to use for login
 * - password (string): User password to use for login
 * - validity (string): Expected result - 'valid' for successful login, 'invalid' for failed login
 * 
 * Test Cases:
 * 1. Valid credentials - Should successfully log in (laura.taylor1234@example.com / test123)
 * 2. Invalid user - Should show error message (invaliduser@example.com / test321)
 * 3. Invalid password - Should show error message (validuser@example.com / invalidpwd)
 * 4. Empty credentials - Should show error message (empty email and password)
 * 
 * NOTE: We use a 2D array (multi-dimensional) instead of a simple array because each
 * test case requires multiple parameters. This requires using a for...of loop instead
 * of forEach(), as forEach() doesn't work well with destructuring in test parameterization.
 */
const loginTestData:string[][]=[
    ['laura.taylor1234@example.com','test123', 'valid'],      // TC1: Valid credentials
    ['invaliduser@example.com', 'test321', 'invalid'],         // TC2: Invalid user
    ['validuser@example.com', 'invalidpwd','invalid'],         // TC3: Invalid password
    ['','',"invalid"]                                           // TC4: Empty credentials
]

/**
 * Iterate through each test data set and create parameterized test cases
 * 
 * Uses destructuring syntax: const [email, password, validity] of loginTestData
 * This extracts each element from the array for use in the test
 * 
 * Alternative methods NOT used here:
 * - forEach() loop - Not suitable for test parameterization
 * - test.each() - Not used in this example but is another valid approach
 */
for( const[email, password, validity] of loginTestData){
    /**
     * Test Suite: Login Data Driven Test
     * Groups all login-related tests together for better organization
     */
    test.describe('Login data driven test', async()=>{
        /**
         * Individual Test Case: Login with dynamic parameters
         * 
         * Test Name: "Login test for [email] and [password]"
         * - Template literal creates descriptive test names for better reporting
         * - Makes it easy to identify which data set each test is using
         * 
         * @param {Page} page - Playwright page object for browser interactions
         */
        test(`Login test for ${email} and ${password}`, async({page})=>{
            // Step 1: Navigate to the login page
            await page.goto("https://demowebshop.tricentis.com/login");
            
            // Step 2: Fill in email field with test data
            await page.getByRole('textbox', {name:'Email:'}).fill(email);
            
            // Step 3: Fill in password field with test data
            await page.getByRole('textbox', {name:'Password:'}).fill(password);
            
            // Step 4: Click the Login button to submit the form
            await page.getByRole('button', {name:'Log in'}).click();
            
            /**
             * Step 5: Validate the outcome based on expected validity
             * 
             * Conditional Logic:
             * - If validity === 'valid': Expect successful login (Logout link should be visible)
             * - If validity === 'invalid': Expect login failure (Error message should be visible)
             */
            if(validity==='valid'){
                // Scenario: Valid credentials - User should be logged in
                // Assertion: Logout link should be present and visible on the page
                const logout:Locator= page.getByRole('link', {name:'Log out'});
                await expect(logout).toBeVisible();
            }else{
                // Scenario: Invalid credentials - Login should fail
                // Assertion: Validation error message should be displayed
                // Timeout: 3000ms to wait for error message to appear
                await expect(page.locator('.validation-summary-errors')).toBeVisible({timeout: 3000})
            }
        })
})
}

