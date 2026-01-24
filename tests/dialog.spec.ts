import {test,expect} from '@playwright/test'

test('Simple alert',async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Below is called event handler which has written before performing any opertaions on alert dialog. By default it will handle alerts.
    // Register a dialog
    page.on('dialog', (dialog)=>{
            console.log('Alert type: ', dialog.type());
            console.log('Dialog text: ', dialog.message());
            expect(dialog.message()).toBe('I am an alert box!');
            dialog.accept();
    })
    await page.getByRole('button', {name:'Simple Alert'}).click();
    await page.waitForTimeout(5000);

})

test('confirm dialog', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/');
    
     page.on('dialog', (dialog)=>{
        console.log('Dialog type: ',dialog.type());
        console.log('Text: ',dialog.message());
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Press a button!');
        //dialog.dismiss();
        dialog.accept();
     })

     await page.locator('#confirmBtn').click();
     const message:string=await page.locator('#demo').innerText();
     console.log('Message is ', message)
    // expect(message).toBe('You pressed Cancel!');
    expect(message).toBe('You pressed OK!');

})


test.only('prompt dialog', async ({page})=>{
     await page.goto('https://testautomationpractice.blogspot.com/');
    
     page.on('dialog', (dialog)=>{
        console.log('Dialog type : ',dialog.type());
        console.log('Default text : ',dialog.defaultValue());
        console.log('Text is :', dialog.message());
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('Please enter your name:');

        expect(dialog.defaultValue()).toBe('Harry Potter');
        dialog.dismiss();
        //dialog.accept('Jhon');
     })

     await page.locator('#promptBtn').click();
     const message:string=await page.locator('#demo').innerText();
     console.log('Message is ', message);
     //expect(message).toContain('Jhon')
    expect(message).toBe('User cancelled the prompt.');
    // expect(message).toBe('You pressed OK!');

})


