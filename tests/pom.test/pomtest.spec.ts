import {test,expect,Page} from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { HomePage } from "../../pages/HomePage"
import { CartPage } from "../../pages/CartPage"

test('Add product to cart', async({page})=>{

    await page.goto('https://demoblaze.com/index.html');

    const loginPage=new LoginPage(page);
    await loginPage.clickLoginlink()
        .then(lp => lp.enterUserName('pavano1'))
        .then(lp => lp.enterPassword('test@123'))
        .then(lp => lp.clickOnLoginButton());

    const homePage= new HomePage(page);
    await homePage.addToCartProduct('Nokia lumia 1520')
            .then(hp=>hp.clickOnAddToCarT())
            .then(hp => hp.clickCartLink());

    await page.waitForTimeout(2000)

    const cartPage= new CartPage(page);
    const boolean=await cartPage.isProductAvailable('Nokia lumia 1520');
    await page.waitForTimeout(2000)
    expect(boolean).toBe(true);
    
})