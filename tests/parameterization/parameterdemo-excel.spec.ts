/*
    Install xlsx package using below command:
        npm install xlsx
*/

import {test, expect, Locator} from '@playwright/test'
import { Workbook } from 'exceljs';
import fs from 'fs'
import * as XLSX from 'xlsx';

//rwading excel

//file --> workbook --> sheets -- rows and columns

const excelfilePath="testData/data.xlsx"

const workbook=XLSX.readFile(excelfilePath);
const sheetNames=workbook.SheetNames[0];
const worksheet=workbook.Sheets[sheetNames];

//convert sheet into json
const loginData:any=XLSX.utils.sheet_to_json(worksheet);


test.describe("Read data from excel and use it in login page", async()=>{
    for(const {email, password , validity} of loginData){
        test(`login with email: ${email} and password: ${password}`, async({page})=>{
                await page.goto("https://demowebshop.tricentis.com/login");
                await page.getByRole('textbox', {name:'Email:'}).fill(email);
                await page.getByRole('textbox', {name:'Password:'}).fill(password);
                await page.getByRole('button', {name:'Log in'}).click();
                if(validity.toLowerCase()==='valid'){
                    const logout:Locator= page.getByRole('link', {name:'Log out'});
                    await expect(logout).toBeVisible();
                 }else{
                     await expect(page.locator('.validation-summary-errors')).toBeVisible({timeout: 3000})
                     }

        })
    }


})



