const{test,expect} = require('@playwright/test');

test('First Playwright Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/');


});

test('Browser Context Test', async ({page})=> 
{

    await page.goto('https://www.google.com/');

    console.log( await page.title());
    await expect(page).toHaveTitle("Google");

});

test('Login Page Test', async ({page})=>
{
    const userName = page.locator('input#inputUsername');
    const passWord = page.locator('[name="inputPassword"]');
    const submitBtn = page.locator('[type="submit"]');

    await page.goto('https://rahulshettyacademy.com/locatorspractice/');
    await page.locator('input#inputUsername').type('Ruman');
    await page.locator('[name="inputPassword"]').type('1234');
    await page.locator('[type="submit"]').click();
    // Get the text an show in the console
    console.log(await page.locator('p.error').textContent());
    // Assertion
    await expect(page.locator('p.error')).toContainText('Incorrect');
    // clear and re-enter
    await userName.fill('');
    await userName.fill('ruman');
    await passWord.fill('');
    await passWord.fill('rahulshettyacademy');
    await submitBtn.click();

    
    
})

test('List of elements test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('guhaniyogi.ruman@gmail.com');
    await page.locator('#userPassword').fill('12345678');
    await page.locator('#login').click();
    // console.log(await page.locator('.card-body h5 b').first().textContent());
    // console.log(await page.locator('.card-body h5 b').last().textContent());
    // console.log(await page.locator('.card-body h5 b').nth(1).textContent());

    const allText = await page.locator('.card-body h5 b').allTextContents();
    console.log(allText);
})