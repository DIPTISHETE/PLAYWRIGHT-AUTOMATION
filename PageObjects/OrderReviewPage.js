const { expect } = require('@playwright/test');

class OrderReviewPage {
  constructor(page) {
    this.page = page;
    this.country = page.locator('[placeholder*="Country"]');
    this.countryDropdown = page.locator('.ta-results');
    this.emailInput = page.locator('.user__name [type="text"]').first();
    this.submitOrderButton = page.locator('.action__submit'); // ✅ Fixed line
    this.orderSuccessMessage = page.locator('.hero-primary');
    this.orderIdText = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async searchCountryAndSelect(countryCode, countryName) {
    await this.country.type(countryCode, { delay: 100 });
    await this.countryDropdown.waitFor();

    const optionsCount = await this.countryDropdown.locator('button').count();
    for (let i = 0; i < optionsCount; i++) {
      const text = await this.countryDropdown.locator('button').nth(i).textContent();
      if (text?.trim() === countryName) {
        await this.countryDropdown.locator('button').nth(i).click();
        break;
      }
    }
  }

  async submitAndGetOrderId() {
    await this.emailInput.isVisible();
    await this.submitOrderButton.click();
    await expect(this.orderSuccessMessage).toHaveText(" Thankyou for the order. ");
    const orderId = await this.orderIdText.textContent();
    return orderId?.trim();
  }
}

module.exports = { OrderReviewPage };
