import {test,Locator,expect} from "@playwright/test"

test('static web table ', async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/');
   const table:Locator=page.locator("table[name='BookTable'] tbody");
   await expect(table).toBeVisible();

   //1) count number of rows in a table
   const rows:Locator= table.locator("tr"); // chaining of locators. used table locator instead of page
   await expect(rows).toHaveCount(7);

   const rowCount:number=await rows.count();
   console.log("Number of rows :", rowCount);// Here rows includes headers
   expect(rowCount).toBe(7);


   //2) count number of headers/columns
   const headers:Locator= rows.locator("th");
   const headersCount= await headers.count();
   console.log('Headers in table', headersCount);
   expect(headersCount).toBe(4);
   await expect(headers).toHaveCount(4);


   //3) Read all data from 2nd row (index 2 means 3rd row including headers)
   const secondCell:Locator= rows.nth(2).locator('td');
   const secondRowData:string[]=await secondCell.allInnerTexts();
   console.log("Second row data:" ,secondRowData);
   await expect(secondCell).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);
   console.log('Printing 2nd row data..........')
   for(let text of secondRowData){
    console.log(text)
   }
   

   //4) Read all data from 4th row exclusing header
  const allRows:Locator[]= await rows.all(); // It returns array of locators
  for(let row of allRows.slice(1)){  // slice(1) --> removes header row
      const col=await row.locator('td').allInnerTexts()
      console.log(col.join('\t'))
  }


  //5) Print books names based on author name
  console.log("Books written by Mukesh");
  const MukeshBooks:string[]=[];
  for(let row of allRows.slice(1)){// slice(1) --> removes header row
      const cells=await row.locator('td').allInnerTexts();
      const author=cells[1];
      const books=cells[0];

      if(author==='Mukesh'){
         console.log(`${author} \t ${books}`);
          MukeshBooks.push(books);
      }

  }
   expect(MukeshBooks).toHaveLength(2);


   //6) Calculate total price of all books
   let totalPrice=0;
   for(let row of allRows.slice(1)){// slice(1) --> removes header row
      const cells=await row.locator('td').allInnerTexts();
      const price=cells[3];
      totalPrice= totalPrice+parseInt(price);

  }

  console.log("Total price is", totalPrice)
  expect(totalPrice).toBe(7100)


   

})