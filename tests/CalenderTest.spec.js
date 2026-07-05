const{test,expect} = require('@playwright/test')

test('Calender Test', async({page}) => {

    const month = '9';
    const date = '8';
    const year = '2027';
    const fullDate = [date,month,year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click()
    // await page.getByRole('button', {name: "Submit"}).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const actDate = await page.locator('.react-date-picker__inputGroup input');
    for (let i =0; i <fullDate.length;i++) {
            const actVal = await actDate.nth(i).inputValue();
            expect(actVal).toEqual(fullDate[i]);
    }













})