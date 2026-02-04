import {test,expect} from "@playwright/test"

//Purpose: Runs once before all tests in a file or a describe block.
test.beforeAll('before all', async()=>{
    console.log("before all")
})

//Purpose: Runs once after all tests in a file or a describe block.
test.afterAll('after all', async()=>{
    console.log("after all")
})

//Purpose: Runs before each individual test.
test.beforeEach('beforeEach', async()=>{
    console.log("this before each")
})

//Purpose: Runs after each individual test.
test.afterEach('afterEach', async()=>{
    console.log("this after each")
})
 test('test1', async()=>{
        console.log("This is test1...")
 });

 test('test2', async()=>{
        console.log("This is test2...")
 });

 test('test3', async()=>{
        console.log("This is test3...")
});

 test('test4', async()=>{
        console.log("This is test4...")
 });
