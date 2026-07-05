const{test,expect} = require('@playwright/test')

test("Elemnet visibe hidden test", async({page})=> {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:"ss_locator.png"});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({path:"ss.png"});
    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#alertbtn").click();

})