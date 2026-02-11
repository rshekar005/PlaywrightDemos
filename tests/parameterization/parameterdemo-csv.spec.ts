/**
 * @file parameterdemo-csv.spec.ts
 * @description Data-Driven Login Test Suite using CSV External Data Source
 * 
 * This test file implements a parameterized/data-driven testing approach using CSV files as the external data source.
 * Test data is stored in a CSV file (testData/data.csv) and loaded at runtime, providing better separation between
 * test logic and test data. This approach allows non-technical team members to easily add or modify test cases without
 * touching the test code, improving maintainability and scalability of the test suite.
 * 
 * ARCHITECTURE:
 * - File I/O: Uses Node.js fs module to read the CSV file from the file system
 * - CSV Parsing: Uses csv-parse library to convert CSV content into JavaScript objects
 * - Type Safety: Uses 'any[]' type for flexibility with CSV data
 * - Data Iteration: Iterates through each row in the CSV file using for...of loop
 * - Dynamic Test Names: Template literals create unique test names for each data row
 * 
 * DATA SOURCE:
 * CSV file location: testData/data.csv
 * CSV structure:
 *   - Header: email,password,validity
 *   - Columns:
 *     * email: User email address to test (supports empty values)
 *     * password: User password to test (supports empty values)
 *     * validity: Expected outcome - 'valid' for successful login, 'invalid' for failed login
 * 
 * 
 * ADVANTAGES OF CSV-BASED APPROACH:
 * - Non-code format: Easy for QA/Product teams to manage test data in Excel
 * - Scalability: Can easily add hundreds of test cases without code changes
 * - Maintainability: Changes to test data don't require code modifications or redeploy
 * - Version Control: CSV files are easier to diff and review in git
 * - Multi-environment: Different CSV files can be used for different environments
 * 
 * DEPENDENCIES:
 * - @playwright/test: Playwright testing framework
 * - csv-parse: Library for parsing CSV files (npm install csv-parse)
 * - Node.js fs module: Built-in module for file system operations
 * 
 * @author Playwright Learning
 * @version 3.0
 * @requires npm install csv-parse
 */

import {test, expect, Locator} from "@playwright/test"
import fs from 'fs'
import {parse} from 'csv-parse/sync'

const csvPath="testData/data.csv";


const fileContent=fs.readFileSync(csvPath, "utf-8");
const records:any[]=parse(fileContent,{
    columns:true, // It treats the first row as headers
    skip_empty_lines:true //Ignores any blank/empty rows in the CSV file
})

 

test.describe('Login data driven test', async()=>{
   
    for( const data of records){
       
        test(`Login test with email: "${data.email}" and password: "${data.password}"`, async({page})=>{
           
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.getByRole('textbox', {name:'Email:'}).fill(data.email);
            await page.getByRole('textbox', {name:'Password:'}).fill(data.password);
            
            await page.getByRole('button', {name:'Log in'}).click();
            
            if(data.validity==='valid'){
                const logout:Locator= page.getByRole('link', {name:'Log out'});
                await expect(logout).toBeVisible();
            }else{
                await expect(page.locator('.validation-summary-errors')).toBeVisible({timeout: 3000})
            }
        })
}
})


