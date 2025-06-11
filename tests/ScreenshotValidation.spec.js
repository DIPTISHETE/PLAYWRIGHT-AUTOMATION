const { test, expect } = require('@playwright/test');

test.only('Popup validations with screenshot & visual comparison', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // ✅ Assert textbox is visible by default
  await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({ path: "screenshots/displayed-text.png" });



  // ⛔ Click 'Hide' button
  await page.locator("#hide-textbox").click();

  // ✅ Assert textbox is now hidden
  await expect(page.locator("#displayed-text")).toBeHidden();

  // await page.screenshot({ path: 'screenshot.png' });

});
