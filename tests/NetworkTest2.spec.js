// Import Playwright's test and assertion methods
const { test, expect } = require('@playwright/test');


// Define the test
test('@QW Security test request intercept', async ({ page }) => {

    //---------------------------------------------------
    // 🔐 Step 1: Login to the application
    //---------------------------------------------------
    await page.goto("https://rahulshettyacademy.com/client");

    // Fill in valid email and password fields
    await page.locator("#userEmail").fill("saloni10@gmail.com");
    await page.locator("#userPassword").fill("Saloni@9696");

    // Click the login button
    await page.locator("[value='Login']").click();

    // Wait until all network requests settle after login
    await page.waitForLoadState('networkidle');

    // Wait for product cards to load on the homepage
    await page.locator(".card-body b").first().waitFor();

    //---------------------------------------------------
    // 📦 Step 2: Navigate to 'My Orders' page
    //---------------------------------------------------
    await page.locator("button[routerlink*='myorders']").click();

    //---------------------------------------------------
    // 🕵️‍♂️ Step 3: Intercept the request to order details
    // and forcibly change the ID to simulate unauthorized access
    //---------------------------------------------------
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route =>
            route.continue({
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
                // Injecting a hardcoded (unauthorized) order ID
            })
    );

    //---------------------------------------------------
    // 🔍 Step 4: Click on 'View' button of the first order
    //---------------------------------------------------
    await page.locator("button:has-text('View')").first().click();

    //---------------------------------------------------
    // 🚫 Step 5: Assert the error message shown for unauthorized access
    //---------------------------------------------------
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

    // This confirms the app does not allow access to orders that don't belong to the logged-in user

});
