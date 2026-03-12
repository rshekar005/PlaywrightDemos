import { Page, Locator } from "@playwright/test";

export class HomePage{

    private readonly page:Page;
    private readonly productList: Promise<Array<Locator>>;
    private readonly addTocartButton:Locator;
    private readonly cartLink:Locator;

    constructor(page:Page){
        this.page=page;
        this.productList=this.page.locator('#tbodyid .card-title>a').all();
        this.addTocartButton=this.page.getByRole('link', { name: 'Add to cart' })
        this.cartLink=this.page.getByRole('link', {name:'Cart', exact:true});
        
        this.page.once('dialog', async(dialog)=>{
            if(dialog.message().includes('added')){
                await dialog.accept();
            }
        });
    }
        
    async addToCartProduct(productName:string):Promise<HomePage>{
        const products= await this.productList;
        for(const product of products){
            const name=await product.textContent();
            if(name?.trim()===productName){
                await product.click();
                return new HomePage(this.page);
            }
        }
        return new HomePage(this.page);
    }

    async clickOnAddToCarT():Promise<HomePage>{
        await this.addTocartButton.click();
        return new HomePage(this.page);
    }

    async clickCartLink():Promise<HomePage>{
        await this.cartLink.click()
        return new HomePage(this.page);
    }



}