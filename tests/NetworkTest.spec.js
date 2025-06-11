// Import required Playwright test functions and modules
const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

// Login and Order Payloads (used for API requests)
const loginPayLoad = {
  userEmail: "saloni10@gmail.com",
  userPassword: "Saloni@9696"
};

const OrderPayLoad = {
  orders: [
    { country: "Cuba", productOrderedId: "67a8df1ac0d3e6622a297ccb" }
  ]
};

// This fake payload will replace the real API response when fetching order list
const fakePayLoadOrders = {
  data: [],
  message: "No Orders"
};

let response; // Will hold the API token response

//------------------------------------
// 🔹 Run once before all tests
//------------------------------------
test.beforeAll(async () => {
  // Create a new API context
  const apiContext = await request.newContext();

  // Create a utility instance to call our API functions
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);

  // Call API to create an order and store the response
  response = await apiUtils.createOrder(OrderPayLoad);
});

//------------------------------------
// 🔹 Main Test: UI + Mocked API Order Fetch
//------------------------------------
test('@SP Place the order', async ({ page }) => {

  // Inject token directly into browser localStorage before page loads
  page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);

  // Navigate to the app
  await page.goto("https://rahulshettyacademy.com/client");

  //----------------------------------------
  // 🔸 Intercept the order fetch request and return fake data
  //----------------------------------------
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const originalResponse = await page.request.fetch(route.request());
      const fakeBody = JSON.stringify(fakePayLoadOrders);

      // Fulfill with original headers + fake response body
      route.fulfill({
        response: originalResponse,
        body: fakeBody
      });
    }
  );

  // Click on "My Orders" in the UI
  await page.locator("button[routerlink*='myorders']").click();

  // Wait until the intercepted API call completes
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

  // Optional: You can assert UI changes here
  // const orderText = await page.locator(".mt-4").textContent();
  // expect(orderText).toContain("No Orders");
});
