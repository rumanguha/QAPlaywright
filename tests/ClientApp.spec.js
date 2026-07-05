const{test,expect} = require('@playwright/test');

test('List of elements test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('guhaniyogi.ruman@gmail.com');
    await page.locator('#userPassword').fill('12345678');
    await page.locator('#login').click();
    // console.log(await page.locator('.card-body h5 b').first().textContent());
    // console.log(await page.locator('.card-body h5 b').last().textContent());
    // console.log(await page.locator('.card-body h5 b').nth(1).textContent());
    await page.waitForLoadState('networkidle');
    const allText = await page.locator('.card-body h5 b').allTextContents();
    console.log(allText);
})

test('UI Controls', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const type = page.locator('select.form-control');

    // Radio button
    await page.locator('span.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    // assertion on button check
    await expect(page.locator('span.checkmark').nth(1)).toBeChecked();
    // Checkbox
    await page.locator('#terms').click();
    // assertion
    await expect(page.locator('#terms')).toBeChecked();
    // unchcek checkbox
    await page.locator('#terms').uncheck();
    // Assertion
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    // Assertion of blinking text attribute
    const blinkText = page.locator('[href*="rahul"]');
    await expect(blinkText).toHaveAttribute('class','blinkingText');

    await type.selectOption('teach');
    await page.pause();
})

test('Window Handling test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkText = page.locator('[href*="rahul"]');

    const [newpage] = await Promise.all([   
    context.waitForEvent('page'),
    await blinkText.click()
    ])

    const alltext = await newpage.locator('p.red').textContent();
    const name = alltext.split('@')[1].split(' ')[0];
    console.log(name);
    await page.locator('#username').fill(name);
    await page.pause();
})

test.only('Add to cart test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('guhaniyogi.ruman@gmail.com');
    await page.locator('#userPassword').fill('12345678');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    // Add specific product to cart
    await page.locator('.card-body b').first().waitFor();
    const expProduct = 'ZARA COAT 3';
    const allProducts = await page.locator('.card-body');
    const count = await allProducts.count();
    for(let i =0; i < count; ++i){

        if(await allProducts.nth(i).locator('b').textContent() === expProduct) {
            await allProducts.nth(i).locator('text= Add To Cart').click();
            break;
    }
    }
    // Cart Click
    await page.locator('[routerlink*="cart"]').click();
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

    await page.locator('button[type="button"]').first().waitFor();

    const allcountry = await page.locator('button[type="button"]').count();
    for(let i =0; i < allcountry; ++i){
        const text = await page.locator('button[type="button"]').nth(i).textContent();
        if(text.trim() === 'British Indian Ocean Territory') {
            await page.locator('button[type="button"]').nth(i).click();
            break;
        }
    }
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