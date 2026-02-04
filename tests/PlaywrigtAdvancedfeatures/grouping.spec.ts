import {test, expect} from "@playwright/test"

/*
    By default playwright will execute all cases in parallel which can be configured from playwright.config.ts
    
    For grouping we have to use describe
        How to run test based on Group?
        use this command : npx playwright test grouping.spec.ts --grep "<group_name>"


*/

test.describe('Group1 ', async()=>{
    test('test1', async()=>{
        console.log("This is test1...")
    });

    test('test2', async()=>{
        console.log("This is test2...")
    });

})

test.describe('Group2', async()=>{
    test('test3', async()=>{
        console.log("This is test3...")
    });

    test('test4', async()=>{
        console.log("This is test4...")
    });

    test('test5', async()=>{
        console.log("This is test5...")
    });
})

