import {test,expect} from "@playwright/test"
import { fr } from "date-fns/locale";

test('Handling frames',async ({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    // Total number of frames
    const frames=page.frames();
    console.log('Number of frames ',frames.length)
    /* 
        -- Approach 1 -- using page.frame. In this approach we can identify frame in 2 types.
        1. Using url of a frame and 2. using frame name
        Return type of frame method is Frame and null.
    */
    const frame= page.frame({url:'https://ui.vision/demo/webtest/frames/frame_2.html'});
    if(frame){
        // We can interact with frame locators in two types 
       await frame.locator("[name='mytext2']").fill("Rajashekar");  //-- 1st type
        //await frame.fill("[name='mytext2']", "Rajashekar") // 2. Using frame.fill
    }else{
        console.log("Frame is not available")
    }
    /*
        Approach 2 to page.frameLocator()   --> In this approach we can capture frame using ID, CSS< Xpath, playwright locators etc...
        Here [src='frame_1.html] is a css selector

    */
    await page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']").fill("Jhon");
           await page.waitForTimeout(3000);

})



test('Handling Inner/child frames',async ({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const frame3=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'});

    /* Here frame return type is Frame and Null. So we cannot declare locator with frame as it may return null also
        frame3? --> It will return frame if frame available if not null.
        If we won'f use ? (optional) parameter then add below code in ifelse condition */
    await frame3?.locator("[name='mytext3']").fill('Smith');


    /* handling child frames */
    const childFrames=frame3?.childFrames();
    console.log("Number of child elements :",childFrames?.length)

    /*Switch to child frames */
    if(childFrames && childFrames.length > 0){
        const radio= childFrames[0].getByLabel('I am a human');
        await radio.check();
        await expect(radio).toBeChecked();
    }else{
        console.log('Child frame not found')
    }

    await page.waitForTimeout(5000)
   
})

test.only("handling 5th frame",async ({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const frame5=page.frame({url:'https://ui.vision/demo/webtest/frames/frame_5.html'});
    const frame5Input= frame5?.locator("[name='mytext5']");
    await frame5Input?.fill('Steve');
    expect(await frame5Input?.inputValue()).toBe('Steve')
    await page.waitForTimeout(5000)
    await frame5?.getByRole('link',{name: 'https://a9t9.com'}).click();
    await page.waitForTimeout(5000)
    const logo = await frame5?.getByRole('img' ,{name:'Ui.Vision by a9t9 software - Image-Driven Automation'}).isVisible();
    expect(logo).toBe(true);

})