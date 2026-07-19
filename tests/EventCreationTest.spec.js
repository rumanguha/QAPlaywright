const{test,expect} = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const USERNAME = 'guhaniyogi.ruman@gmail.com';
const PASSWORD = 'Guhaniyogi$1';

// Helpers
async function Login(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(USERNAME);
    await page.getByLabel('password').fill(PASSWORD);
    await page.locator('#login-btn').click();
    // Login validation
    await expect(await page.locator("a[href*='events'] span")).toBeVisible();
}

test('Event Creation Test', async ({page})=> {

    await Login(page);
    // Navigate to Admin Events page
    await page.getByRole('button', { name: 'Admin'}).click();
    await page.locator(".relative a[href*='admin/events']").click();

    // Fill the Event Creation form
    // Title
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator('#event-title-input').fill(eventTitle);
    // Description
    await page.getByPlaceholder('Describe the event…').fill('This is a test event');
    // City
    await page.getByLabel('city').fill('Bangalore');
    // Venue
    await page.getByLabel('venue').fill('Test Venue');
    // Date
    await page.getByLabel('Event date & Time').fill('2027-12-31T10:00');
    const seatForEvent = '67';
    await page.getByLabel('price ($)').fill('100');
    await page.getByLabel('total seats').fill(seatForEvent);
    await page.locator('#add-event-btn').click();

    await expect(await page.getByText("Event Created!")).toBeVisible();

    console.log(`Event "${eventTitle}" created successfully.`);

    // Find the event card and capture seats
    await page.goto(`${BASE_URL}/events`);
    await expect(await page.locator("[data-testid='event-card']").first()).toBeVisible();
    await expect(await page.locator("[data-testid='event-card']").filter({ hasText: eventTitle })).toBeVisible();
    const seatsBeforeBooking = await page.locator("[data-testid='event-card']").filter({ hasText: eventTitle }).locator("span.text-emerald-600").textContent();
    console.log(`Seats available before booking: ${seatsBeforeBooking}`);
    await expect(seatsBeforeBooking.split(" ")[0].trim()).toEqual(seatForEvent);

    // Start booking
    await page.locator("[data-testid='event-card']").filter({ hasText: eventTitle }).locator("#book-now-btn").click();

    // Fill booking form
    await expect(await page.locator("#ticket-count").textContent()).toEqual('1');
    // Fill Name
    await page.getByLabel('Full Name').fill('test user');
    // Fill Email
    await page.getByLabel('Email').fill('abc@gmail.com');
    // Fill Phone Number
    await page.getByLabel('Phone Number').fill('+91 98765 43210');
    await page.locator('#confirm-booking').click();

    // Verify booking confirmation
    await expect(await page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    console.log(`Booking confirmed with reference: ${bookingRef}`);

    // Verify in My Bookings
    await page.getByRole('button', { name: 'View My Bookings'}).click();
    // Verify URL
    await expect(page.url()).toEqual(`${BASE_URL}/bookings`);
    // Verify booking reference is present
    await expect(await page.locator(" #booking-card").first()).toBeVisible();
    await expect(await page.locator(" #booking-card").filter({ hasText: bookingRef })).toBeVisible();
    await expect(await page.locator(" #booking-card").filter({ hasText: bookingRef }).locator("h3.font-semibold"))   
})