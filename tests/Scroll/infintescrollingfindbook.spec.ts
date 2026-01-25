import {test, expect} from "@playwright/test"

test("Infinte scrolling", async ({page})=>{
    test.slow(); // set timeout for a single test easy way to triple the default timeout i.e eg:30sec. It means 90sec
    await page.goto("https://www.booksbykilo.in/new-books");

    // window.scrollTo(0,document.body.scrollHeight) --> Infinte scroll without end

    let previousHeight=0;
    let bookFound=false;
    while(true){

        const titles=await page.locator("#productsDiv h3").allTextContents();

        if(titles.includes('The Blue Eye')){
                console.log('Book found');
                bookFound=true;
                expect(bookFound).toBeTruthy();
                break;
        }
        
        //scroll down the page
        await page.evaluate(()=>{
            window.scrollTo(0, document.body.scrollHeight);
        })
        //Wait for new content load
        await page.waitForTimeout(2000)

        //Capture the current height of the page not scroll
       const currentHeight= await page.evaluate(()=>{
               return document.body.scrollHeight;
        }); 
        

        console.log("Previous height", previousHeight);
        console.log('Current height', currentHeight);
        if(currentHeight===previousHeight){
            break;
        }
        previousHeight=currentHeight;

    }
    console.log("***************** End of the page ******************")
    if(!bookFound){
        console.log("Book not found")
    }
    
})