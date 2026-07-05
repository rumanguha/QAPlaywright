const{test,expect} = require('@playwright/test');

test.only('Add to cart test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('guhaniyogi.ruman@gmail.com');
    await page.locator('#userPassword').fill('12345678');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    // Add specific product to cart
    await page.locator('.card-body b').first().waitFor();
    await page.locator("div.card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: " Add To Cart"}).click();

    // const expProduct = 'ZARA COAT 3';
    // const allProducts = await page.locator('.card-body');
    // const count = await allProducts.count();
    // for(let i =0; i < count; ++i){

    //     if(await allProducts.nth(i).locator('b').textContent() === expProduct) {
    //         await allProducts.nth(i).locator('text= Add To Cart').click();
    //         break;
    // }
    // }
    // Cart Click
    // await page.locator('[routerlink*="cart"]').click();
    await page.getByRole("listitem").getByText("Cart").click();
    // Cart validation
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    // Click checkout
    await page.locator('text=Checkout').click();
    // Wait to load
    await page.locator('[placeholder="Select Country"]').waitFor();
    // CVV
    await page.locator('div input[type="text"]').nth(1).fill('123');
    // Name on card
    await page.locator('div input[type="text"]').nth(2).fill('XMan');
    // Select country
    await page.locator('[placeholder="Select Country"]').pressSequentially('ind');
    // await page.getByPlaceholder("Select Country)

    await page.locator('button[type="button"]').first().waitFor();

    await page.getByRole("button", {name: "India"}).nth(1).click();
    // const allcountry = await page.locator('button[type="button"]').count();
    // for(let i =0; i < allcountry; ++i){
    //     const text = await page.locator('button[type="button"]').nth(i).textContent();
    //     if(text.trim() === 'British Indian Ocean Territory') {
    //         await page.locator('button[type="button"]').nth(i).click();
    //         break;
    //     }
    // }
    // Click place order
    await page.locator('a.btnn').click();
    // Wait for order ID
    await page.locator('td.em-spacer-1 label').nth(1).waitFor();
    const orderID = await page.locator('td.em-spacer-1 label').nth(1).textContent();
    // const actualOrder =orderID.split(' ')[2].trim();
    console.log(orderID);
    // Click my orders
    await page.locator('label[routerlink*="myorders"]').click();
    // Wait for table to load
    await page.locator('tr.ng-star-inserted').first().waitFor();

    const allOrderIDs = await page.locator('tr.ng-star-inserted');
    const orderCount = await allOrderIDs.count();
    for(let i = 0; i <orderCount ;i++){
        const actualOrdrs = await allOrderIDs.nth(i).locator('th').textContent();
        if(await orderID.includes(actualOrdrs)) {
            await allOrderIDs.nth(i).locator('button').first().click();
            break;
        }
    }
    await page.locator('div.col-text').waitFor();
    const orderDtls = await page.locator('div.col-text').textContent();
    await expect (await orderID.includes(orderDtls)).toBeTruthy();
})