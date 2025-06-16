const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    // Capture all product titles
    const titles = await this.productsText.allTextContents();
    console.log('Product Titles:', titles);

    // Get all product cards
    const count = await this.products.count();

    // Loop through each product and match title
    for (let i = 0; i < count; i++) {
      const productTitle = await this.products.nth(i).locator('b').textContent();
      if (productTitle.trim() === productName) {
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }

  async navigateToCart() {
  // This wait ensures the cart element appears before asserting visibility
  await this.page.waitForSelector("[routerlink*='cart']", { timeout: 10000 });
  await expect(this.cart).toBeVisible();
  await this.cart.click();
}

}

module.exports = { DashboardPage };
