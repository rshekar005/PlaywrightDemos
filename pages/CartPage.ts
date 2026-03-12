import { Page, Locator } from "@playwright/test";

export class CartPage{
    private page:Page;
    private productList:Promise<Array<Locator>>;

    constructor(page:Page){
        this.page=page;
        this.productList= this.page.locator("#tbodyid td:nth-child(2)").all();
    }

   async isProductAvailable(productName:string):Promise<boolean>{
        const products=await this.productList;
       
        for(const product of products){
            const name= await product.textContent();
            if(name?.trim()===productName){
                return await product.isVisible();
            }
        }
        return false;
   }

}