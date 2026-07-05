const{test} = require('@playwright/test');


test('Demo test', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

})

test('Demo test 2', async ({page}) => {

    await page.goto('https://www.google.com');

})