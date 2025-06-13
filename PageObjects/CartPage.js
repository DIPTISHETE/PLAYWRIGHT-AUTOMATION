const { expect } = require('@playwright/test'); // ✅ Make sure this is imported

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('div li');
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }

  
async verifyProductIsDisplayed(productName) {
  const product = this.getProductLocator(productName);
  await product.waitFor(); // ✅ Wait only for the specific product
  const bool = await product.isVisible();
  await expect(bool).toBeTruthy(); // ✅ Correct assertion
}


  async checkOut() {
    await this.checkout.click();
  }

  getProductLocator(productName) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
}

module.exports = { CartPage };
