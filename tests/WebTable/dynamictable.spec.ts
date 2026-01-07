import {test,Locator, expect} from "@playwright/test"
import { text } from "node:stream/consumers";

test('Verify CPU usage in dynamic table', async ({page})=>{

    await page.goto('https://practice.expandtesting.com/dynamic-table');
    const table:Locator=page.locator('table.table tbody');
    await  expect(table).toBeVisible();

    //Select all the rows and then find number of rows
    const rows:Locator[]=await table.locator('tr').all();
    console.log('Number of rows in a table :',rows.length);
    expect(rows).toHaveLength(4)

    //Step1: For chrome process get value of CPU load

    // Read each row 
    let cpucode='';
    for(const row of rows){
        const processName:string=await row.locator("td").nth(0).innerText();
        if(processName==='Chrome'){
           //  row.locator('td:has-text("%")') --- css text
            cpucode=await row.locator('td', {hasText:'%'}).innerText(); // Playwright has-text

            console.log('CPU load for Chrome process is :',cpucode);
        }
    }
  

    //Step 2: capture value from yellow lable
    const yellowcolortext=await page.locator('#chrome-cpu').innerText();
    console.log("Text in yellow color", yellowcolortext);
    if(yellowcolortext.includes(cpucode)){
        console.log("CPU load in chrome is equal")
    }else{
        console.log("CPU load in chrome is different than Yellow color text")
    }

    expect(yellowcolortext).toContain(cpucode);
      await page.waitForTimeout(5000)

})


test.only("Verify dynamic table --part2", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator=page.locator('#taskTable tbody');
    expect(table).toBeVisible();

    const rows:Locator[]=await table.locator('tr').all();
    console.log("Number of rows", rows.length)

    let cpuutilize='';
    let networkspeed='';
    let memorysize='';
    let diskspace='';

    for(let row of rows){
        const name:string=await row.locator('td').nth(0).innerText();
        if(name==='Chrome'){
            cpuutilize=await row.locator('td', {hasText:'%'}).innerText();
            networkspeed=await row.locator('td', {hasText:'Mbps'}).innerText();
        }
    }

     for(let row of rows){
        const name:string=await row.locator('td').nth(0).innerText();
        if(name==='Firefox'){
            //memorysize =await row.locator('td', {hasText:'MB'}).innerText();
            diskspace=await row.locator('td', {hasText:'MB/s'}).innerText();
        }
    }

    
    const cpuloadofChrome:string=await page.locator('#displayValues>p').nth(0).innerText();
    const memorysizeOfChrome:string=await page.locator('#displayValues>p').nth(1).innerText();
    const networkspaceofFirefox:string= await page.locator('#displayValues>p').nth(2).innerText();
    const diskspaceofFirefox:string=await page.locator('#displayValues>p').nth(3).innerText();
    console.log(memorysizeOfChrome)
    console.log('CPU Utilize of chrome',cpuutilize);
    console.log('Network speed of chrome',networkspeed)
    console.log('Memory size of firefox',memorysize);
    console.log('Diskspace of firefox',diskspace);

    expect(cpuloadofChrome).toContain(cpuutilize)
    expect(memorysizeOfChrome).toContain(memorysize)
    expect(networkspaceofFirefox).toContain(networkspeed)
    expect(diskspaceofFirefox).toContain(diskspace)

    await page.waitForTimeout(10000)
    

})