const{test,expect} = require('@playwright/test')

test("Visual Test", async({page})=> {

    await page.goto("https://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
    console.log("Visual test completed");
    // Ruman changes
    console.log("Ruman changes applied");
    //Abhik Changes
    console.log("Abhik Changes");
    //Abhik Changes 2
    console.log("Abhik Changes 2");

    // Ruman Change 2
    console.log("Ruman Change 2 applied");
    // Ruman Change 3
    console.log("Ruman Change 3 applied");
    // Ruman Change 4
    console.log("Ruman Change 4 applied");
})