const { test, expect } = require('@playwright/test');
const { it } = require('node:test');

//ENd to End automation Test
// 1.Login
// 2.add the products to the cart
// 3.chcckout
// 4.submit the items buy it
// 5.go to details page--grab ithe orderId
// 6.go to history page

test('Demo test', async ({ page }) => {
  const email= "saloni10@gmail.com"
  const productName = 'ZARA COAT 3';

  // Navigate to the application
  await page.goto("https://rahulshettyacademy.com/client");

  // Login with valid credentials
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Saloni@9696");
  await page.locator('[value="Login"]').click();

  // Wait for all network requests to finish
  await page.waitForLoadState('networkidle');

  // Capture all product titles
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);

  // Get all product cards
  const products = page.locator('.card-body');
  const count = await products.count();

  // Loop through each product to find and add 'ZARA COAT 3' to the cart
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // Go to the cart
  await page.locator("[routerlink*='cart']").click();

  // Wait for the cart item to be visible
  await page.locator('div li').first().waitFor();

  // Assert product is visible in the cart
  await expect(page.locator(`h3:has-text('${productName}')`)).toBeVisible();

  // Proceed to checkout
  await page.locator("text=Checkout").click();

  // Type "ind" with delay to trigger country dropdown
  await page.locator('[placeholder*="Country"]').pressSequentially("ind", { delay: 100 });

  // Define dropdown locator properly
  const dropdown = page.locator(".ta-results");

  // Wait for the dropdown to appear
  await dropdown.waitFor();

  // Loop through dropdown options to select "India"
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === ' India') {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

// ✅ FIXED: Validate email is displayed (not using toHaveValue, because it's not an input)
 expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
 await page.locator(".action__submit ").click()
 await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');

// Capture the orderId
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order ID:", orderId);

 //finding ur order in the orders page
  // Go to 'My Orders' page
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");
 const rowCount = await rows.count();
// Find matching order and open details
  for (let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  // Verify order details page has matching order ID
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
