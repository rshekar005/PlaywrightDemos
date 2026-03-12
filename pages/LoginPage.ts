import { Page, Locator } from "@playwright/test";

export class LoginPage{

    //define the variables, constructors and action methods
    private readonly page :Page;
    private readonly loginLink: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.loginLink=this.page.getByRole('link', {name:'Log in'});
        this.userNameInput= this.page.locator('#loginusername')
        this.passwordInput=this.page.locator('#loginpassword')
        this.loginButton=this.page.getByRole('button', {name:"Log in"});
    }

    async clickLoginlink():Promise<LoginPage>{
        await this.loginLink.click();
        return new LoginPage(this.page);
    }

    async enterUserName(username:string):Promise<LoginPage>{
       await this.userNameInput.clear();
       await this.userNameInput.fill(username);
       return new LoginPage(this.page);
    }

     async enterPassword(password:string):Promise<LoginPage>{
       await this.passwordInput.clear();
       await this.passwordInput.fill(password)
       return new LoginPage(this.page);
    }

    async clickOnLoginButton():Promise<LoginPage>{
        await this.loginButton.click();
        return new LoginPage(this.page);
    }

}