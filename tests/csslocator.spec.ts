/*
    css: cascading style sheet
    Types of css locators:
    1. tagname[attribute='value']  -- locates element based on tagname and attribute value
         e.g input[type='text'], input[placeholder='Search store'], a[href='/login'], img[alt='company logo']
    2. .classname  -- locates element based on class attribute
         e.g .input-field, .nav-link, .btn-primary
    3. #idvalue  -- locates element based on id attribute
            e.g #username, #login-button, #search-box
    4. tagname.classname  -- locates element based on tagname and class attribute
            e.g button.btn-primary, input.input-field
    5. tagname#idvalue  -- locates element based on tagname and id attribute    
            e.g input#username, button#login-button
    6. .classname1.classname2  -- locates element based on multiple class names
            e.g .btn.btn-primary, .input-field.required
    7. parentselector > childselector  -- locates direct child element of a parent element
            e.g div.form-group > input.input-field
    8. ancestorselector descendantselector  -- locates any descendant element of an ancestor element
            e.g div.form-container input.input-field
    9. tagname[attribute1='value'][attribute2='value']  -- locates element based on multiple attributes
            e.g input[type='text'][placeholder='Search store']
    10. tagname:nth-of-type(n)  -- locates the nth element of its type among its siblings
            e.g li:nth-of-type(1), tr:nth-of-type(3)
    11. tagname:first-of-type  -- locates the first element of its type among its siblings
            e.g td:first-of-type, p:first-of-type
    12. startwith(^=), endwith($=), contains(*=)  -- locates element based on partial attribute value
            e.g input[placeholder^='Enter'], a[href$='/logout'], img[alt*='logo']
    13. sibling selector (+ , ~)  -- locates sibling elements
            e.g label + input  (adjacent sibling)
                 label ~ input  (general sibling)
    Note: Playwright does not support css locators for shadow DOM elements
    14. has:text("textvalue")  -- locates element containing specific text
            e.g div:has-text("Welcome"), li:has-text("Item 1")
    15. text-is("exacttext")  -- locates element with exact text match
            e.g button:text-is("Submit"), a:text-is("Home")   
    When to use css locators:
    1. When elements have unique class or id attributes
    2. When you need to locate elements based on their styles or visual hierarchy   

*/


import {expect, test} from "@playwright/test";

test("Verify css locators",async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');

    // 1. tagname[attribute='value']
    const searchBox=page.locator("input[value='Search store']");
    await expect(searchBox).toBeVisible();
    await searchBox.fill('T-shirts -- using tagname[attribute="value"]');
    await page.waitForTimeout(2000);


    // 2. tag.classname
    searchBox.clear();
    const searchBox2=page.locator('input.search-box-text');
    await expect(searchBox2).toBeVisible();
    await searchBox2.fill('T-shirts -- using tag.classname');
    await page.waitForTimeout(2000);

    //3. tag#idvalue
    searchBox2.clear();
    const searchBox3=page.locator("input#small-searchterms");
    await expect(searchBox3).toBeVisible();
    await searchBox3.fill('Apple Mac book pro -- using tag#id')
    await page.waitForTimeout(2000);

    //4. using multiple attributes
    searchBox3.clear();
    const searchBox4= page.locator("input#small-searchterms[value='Search store']");
    searchBox4.fill('Dell Laptop -- using multiple attributes');
    await page.waitForTimeout(2000);

    //5. using parent > child selector
    const newsLetter=page.locator("#newsletter-subscribe-block>div[class='newsletter-email']");
    await expect(newsLetter).toBeVisible();
    
    //6. Using child elements
    const newsLetter2=page.locator("input[type='text']:nth-child(1)");
    await expect(newsLetter2).toBeVisible();

    
})