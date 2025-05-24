const { test, expect } = require('@playwright/test');

test('Demo test', async ({ page }) => {
  const productName = 'ZARA COAT 3';

  // Navigate to the application
  await page.goto("https://rahulshettyacademy.com/client");

  // Login with valid credentials
  await page.locator("#userEmail").fill("saloni10@gmail.com");
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

  // Pause for debugging (optional)
  await page.pause();
});
