import { Page, Locator, expect } from "@playwright/test";

export class OrderReviewPage {
  page: Page;
  country: Locator;
  countryDropdown: Locator;
  emailInput: Locator;
  submitOrderButton: Locator;
  orderSuccessMessage: Locator;
  orderIdText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = page.locator('[placeholder*="Country"]');
    this.countryDropdown = page.locator(".ta-results");
    this.emailInput = page.locator('.user__name [type="text"]').first();
    this.submitOrderButton = page.locator(".action__submit"); // ✅ Fixed line
    this.orderSuccessMessage = page.locator(".hero-primary");
    this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.country.type(countryCode, { delay: 100 });
    await this.countryDropdown.waitFor();

    const optionsCount = await this.countryDropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      let text: any;
      text = await this.countryDropdown.locator("button").nth(i).textContent();
      if (text?.trim() === countryName) {
        await this.countryDropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async submitAndGetOrderId() {
    await this.emailInput.isVisible();
    await this.submitOrderButton.click();
    await expect(this.orderSuccessMessage).toHaveText(
      " Thankyou for the order. "
    );
    const orderId = await this.orderIdText.textContent();
    return orderId?.trim();
  }
}

module.exports = { OrderReviewPage };
