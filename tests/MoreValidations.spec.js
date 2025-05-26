const { test, expect } = require('@playwright/test'); // ✅ Correct way with require

test.only('PopUp validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
//   await page.goto('https://google.com');
//   await page.goBack();      // ✅ Go back to previous page
//   await page.goForward();   // ✅ Fixed typo here

//hide textbox 
// Assert that the text box is initially visible
await expect(page.locator("#displayed-text")).toBeVisible();
// Click the "Hide" button to hide the text box
await page.locator("#hide-textbox").click();
// Assert that the text box is now hidden
await expect(page.locator("#displayed-text")).toBeHidden();

});
