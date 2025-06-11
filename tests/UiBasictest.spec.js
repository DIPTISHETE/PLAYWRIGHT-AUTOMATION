const { test, expect } = require("@playwright/test");

// ✅ Test 1: Using browser context to interact with a login page
test("Browser Context Playwright test", async ({ browser }) => {
  const Context = await browser.newContext();           // Create new browser context (like a fresh profile)
  const page = await Context.newPage();                 // Open a new page/tab

  // ❌ Block image requests to speed up test and reduce network load
  await page.route('**/*.{jpg,png,jpeg}', route => route.abort());

  // Define locators
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  // 🔍 Log all requests and responses (URL and status code)
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));

  // ⛔ Go to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());                      // Print the page title

  // 🧪 Try invalid credentials
  await userName.fill("rahulshetty");
  await page.locator("[type=password]").fill("learning");
  await signIn.click();

  // ❌ Expect error message to be visible (Invalid login)
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  // ✅ Clear username and fill correct credentials
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();

  // 🔍 Capture and print all product card titles after login
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

// ✅ Test 2: Simple Google homepage test
test("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.google.com/");            // Navigate to Google
  console.log(await page.title());                      // Print title
  await expect(page).toHaveTitle("Google");             // Assert title is 'Google'
});
