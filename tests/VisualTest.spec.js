const{test,expect} = require('@playwright/test')

test("Visual Test", async({page})=> {

    await page.goto("https://dic.gov.in/careers/?search_keywords=&selected_category=-1&selected_jobtype=-1&selected_location=noida");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})