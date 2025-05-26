import { test, expect } from '@playwright/test';

test('Handle dialog', async ({ page }) => {
  // Navigate to the practice page
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  // Listen for the dialog event and accept it automatically
  await page.pause();
  page.on('dialog', dialog => { dialog.accept(); // or dialog.dismiss() if you want to cancel it
  });

  // Trigger the confirmation dialog
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover()
});
