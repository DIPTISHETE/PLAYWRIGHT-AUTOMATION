const { test, expect } = require("@playwright/test");

test("Select Dropdowns & Radiobtns", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  // Extract and click last radio button
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  // Assertion: Check if last radio button is selected
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // Step 1: Check the checkbox
  await page.locator("#terms").check();

  // Step 2: Assert it's checked
  await expect(page.locator("#terms")).toBeChecked();

  // Step 3: Now uncheck it
  await page.locator("#terms").uncheck();

  // Step 4: Assert it's unchecked
  await expect(page.locator("#terms")).not.toBeChecked();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  // Click and assert document link
  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');

  // Optional: You can click it too if needed
  // await documentLink.click();

  // await page.pause(); // Uncomment for debugging if needed
});
