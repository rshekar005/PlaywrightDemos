import {expect, Locator, test} from "@playwright/test";

test("Verify xpath axes locators", async ({page}) =>{
    
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    // Self axes -- to locate the current node iteself
    const countryName:Locator=page.locator("//td[text()='Germany']/self::td");
    await expect(countryName).toHaveText("Germany");

    //parent axes -- to get all td elements in the row where country is Germany
    const row:Locator=page.locator("//td[text()='Germany']/parent::tr/td"); 
    await expect(row).toHaveCount(3);
    await expect(row.nth(1)).toContainText("Maria Anders");

    //child axes -- all td elements under 3rd tr
    const childELements:Locator=page.locator("//table[@id='customers']//tr[3]/child::td");
    await expect(childELements).toHaveCount(3);
    console.log(await childELements.allTextContents()); 

    //ancestor axes -- Parents, grandparents , great grandparents etc
    const ancestorTable:Locator=page.locator("//td[text()='Germany']/ancestor::table");
    await expect(ancestorTable).toHaveAttribute('id','customers');

    //descendant axes -- children, grandchildren , great grandchildren etc
    const descendantLocator:Locator=page.locator("//table[@id='customers']/descendant::td");
    await expect(descendantLocator).toHaveCount(18);

    //following -- siblings and its sibling children
    const followingElement:Locator=page.locator("//td[text()='Germany']/following::td[1]");
    await expect(followingElement).toHaveText("Centro comercial Moctezuma")

    //following-sibling --sibling elements only
    const followingSibling:Locator=page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(followingSibling).toHaveCount(0);

    const followingSibling1:Locator=page.locator("//td[text()='Maria Anders']/following-sibling::td");
    await expect(followingSibling1).toHaveCount(1);

    //preceding -- preceding siblings and its children
    const precedingElement:Locator=page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingElement).toHaveText("Maria Anders");

    //preceding-sibling -- preceding siblings only
    const precedingSibling:Locator=page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(precedingSibling).toHaveCount(2);
    await expect(precedingSibling.nth(0)).toHaveText("Alfreds Futterkiste");

})