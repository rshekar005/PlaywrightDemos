import {test, expect} from "@playwright/test"
/*
    In playwright.config.ts , fullyparallel set to true and workers are more than 1.
    But here we declare mode as 'serial' it means only worker will be execute all tests in serial mode.
    it means in tests will execute sequentially. Below is the code we need inorder to achieve above

    test.describe.configure({mode:'serial'})

    test.describe.configure({mode:'parallel'}) --> Executes tests present in this file as parallel not sequential execution. Workers will pick from config.ts file

    In playwright.config.ts, we can set parallel mode for specifix browser. For ex: look for this file in project.

    We cab specify number of workers using console command. It will ignore the wrokers configured in playwright.config.ts
    npx playwright test paralleltesting.spec.ts  --headed --workers=3


*/

//test.describe.configure({mode:'serial'})

//test.describe.configure({mode:'parallel'})
test.describe('Group1 ', async()=>{
     test('test3', async()=>{
        console.log("This is test3...")
    });

    test('test1', async()=>{
        console.log("This is test1...")
    });

    test('test2', async()=>{
        console.log("This is test2...")
    });
   

    test('test4', async()=>{
        console.log("This is test4...")
    });

    test('test5', async()=>{
        console.log("This is test5...")
    });

})


