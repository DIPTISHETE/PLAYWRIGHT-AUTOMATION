import { test, expect } from '@playwright/test';

test('Playwright special Locators', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button",{name:'submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link",{name:'Shop'}).click();
  await page.locator("app-card").filter({hasText:"Samsung Note 8"}).getByRole("button").click();


});
