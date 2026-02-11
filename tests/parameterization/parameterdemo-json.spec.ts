/**
 * @file parameterdemo-json.spec.ts
 * @description Data-Driven Login Test Suite using JSON External Data Source
 * 
 * This test file demonstrates parameterized/data-driven testing using external JSON file
 * as the data source. Instead of hardcoding test data in the test file, test data is
 * stored in a separate JSON file and loaded at runtime. This approach provides better
 * separation of concerns and makes it easier to manage and scale test data.
 * 
 * KEY CONCEPTS:
 * - External Data Management: Reading test data from JSON files
 * - File System Operations: Using Node.js fs module to read files
 * - JSON Parsing: Converting JSON strings to JavaScript objects
 * - Object Destructuring: Extracting properties from JSON objects in loop
 * - Data-Driven Testing: Parameterizing tests with external data sources
 * 
 * ADVANTAGES OVER HARDCODED DATA:
 * - Easier to add/modify test cases without touching test code
 * - Separates test logic from test data
 * - Can be managed by non-technical stakeholders
 * - Supports multiple environments with different data sets
 * 
 * @author Playwright Learning
 * @version 2.0
 */

import {test, expect, Locator} from "@playwright/test"

/**
 * Import Node.js File System module
 * 
 * The 'fs' module provides file system operations in Node.js environment.
 * Playwright tests run in Node.js, allowing us to read files from the project directory.
 * 
 * Methods used:
 * - fs.readFileSync(): Synchronously reads file contents (blocks execution until complete)
 *   Note: Synchronous reading is acceptable here since it only happens once during test setup
 */
import fs from 'fs'

/**
 * JSON File Path Configuration
 * 
 * Relative path to the JSON file containing test data.
 * Path is relative to the project root directory where tests are executed.
 * 
 * Location: testData/test.json
 * Expected JSON structure:
 * [
 *   { "email": "user@example.com", "password": "password123", "validity": "valid" },
 *   { "email": "invalid@example.com", "password": "wrongpass", "validity": "invalid" },
 *   ...
 * ]
 */
const jsonPath="testData/test.json";

/**
 * Load and Parse JSON Test Data
 * 
 * Process:
 * 1. fs.readFileSync(jsonPath, "utf-8")
 *    - Reads the JSON file content as a string
 *    - "utf-8" encoding ensures proper character handling
 * 
 * 2. JSON.parse()
 *    - Converts JSON string to JavaScript array of objects
 *    - Each object contains: { email, password, validity }
 * 
 * Type: any[]
 * - Using 'any' type for flexibility with JSON data
 * - Alternative: Could define strict interface for type safety
 *   interface LoginTestData {
 *     email: string;
 *     password: string;
 *     validity: 'valid' | 'invalid';
 *   }
 * 
 * TIMING: Data is loaded once when the test file is executed,
 * not for each test case, improving performance.
 */
const loginDataFromJson:any[]=JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
 
/**
 * Test Suite: Login Data Driven Test with JSON Data Source
 * 
 * Groups all login tests that use JSON external data
 */
test.describe('Login data driven test', async()=>{
    /**
     * Iterate through each test data object from the JSON file
     * 
     * Destructuring: const { email, password, validity } of loginDataFromJson
     * - Extracts email, password, and validity properties from each object
     * - Creates local variables for use in the test
     * 
     * Why this approach?
     * - Object destructuring is cleaner than accessing properties with dot notation
     * - loginDataFromJson[i].email becomes just email
     * - Improves code readability
     */
    for( const {email, password, validity} of loginDataFromJson){
        /**
         * Individual Test Case: Login with dynamic parameters from JSON
         * 
         * Test Name: "Login test for [email] and [password]"
         * - Template literal creates unique, descriptive test names
         * - Each test case shows which data set it's testing
         * - Helpful for identifying failures in test reports
         * 
         * @param {Page} page - Playwright page object for browser interactions
         */
        test(`Login test for ${email} and ${password}`, async({page})=>{
            /**
             * Step 1: Navigate to login page
             * - URL points to demo web shop login page
             */
            await page.goto("https://demowebshop.tricentis.com/login");
            
            /**
             * Step 2: Enter email from JSON data
             * - Locates email textbox by role and name attribute
             * - Fills with email value from current JSON object
             */
            await page.getByRole('textbox', {name:'Email:'}).fill(email);
            
            /**
             * Step 3: Enter password from JSON data
             * - Locates password textbox by role and name attribute
             * - Fills with password value from current JSON object
             */
            await page.getByRole('textbox', {name:'Password:'}).fill(password);
            
            /**
             * Step 4: Click Login button to submit credentials
             * - Locates button by role and name attribute
             * - Triggers the login action
             */
            await page.getByRole('button', {name:'Log in'}).click();
            
            /**
             * Step 5: Validate login result based on expected validity from JSON
             * 
             * Conditional Logic:
             * - If validity === 'valid': Expect successful login
             * - If validity === 'invalid': Expect login failure with error message
             */
            if(validity==='valid'){
                /**
                 * Scenario: Valid credentials provided
                 * Expected: User is logged in successfully
                 * Assertion: Logout link should be visible on the page
                 * - Indicates successful authentication
                 */
                const logout:Locator= page.getByRole('link', {name:'Log out'});
                await expect(logout).toBeVisible();
            }else{
                /**
                 * Scenario: Invalid credentials provided (wrong password, invalid user, empty fields)
                 * Expected: Login fails and error message appears
                 * Assertion: Validation error message container should be visible
                 * - timeout: 3000ms allows time for error message to appear
                 * - Selector '.validation-summary-errors' is the error message container
                 */
                await expect(page.locator('.validation-summary-errors')).toBeVisible({timeout: 3000})
            }
        })
}
})


