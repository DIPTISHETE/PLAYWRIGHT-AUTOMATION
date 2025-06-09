const { test, expect } = require("@playwright/test");

test("Child Window Handle", async ({ browser }) => {
  const context = await browser.newContext(); // Create a new browser context
  const page = await context.newPage(); // Open a new page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // Navigate to the login page

  const documentLink = page.locator("[href*='documents-request']"); // Locate the document request link

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Wait for a new page (tab) to open //listen for any new page pending,rejected,fulfilled
    documentLink.click() // Click the link that opens a new tab
  ]);

  const text = await newPage.locator('.red').textContent(); // Get the text content from the new page
  const arrayText = text.split("@"); // Split the string at '@'
  const domain = arrayText[1].split(" ")[0]; // Extract the domain name from the second part
  console.log(domain); // Print the domain name

//   await page.pause(); // Pause the test for debugging

  console.log(await page.locator("#username").textContent()); // Print the text content of the username field
});














