


const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  // Wait until full load
  await page.goto("https://rahulshettyacademy.com/client");

  // Ensure selectors are correct and syntax is valid
  await page.locator("#userEmail").fill("saloni10@gmail.com");
  await page.locator("#userPassword").fill("Saloni@9696");
  await page.locator('[value="Login"]').click();

  // Optionally wait for navigation after login
//   await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor()
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});




// saloni10@gmail.com
// Saloni@9696