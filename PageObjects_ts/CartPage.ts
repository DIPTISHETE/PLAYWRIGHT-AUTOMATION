import { Page, Locator, expect } from '@playwright/test';
export class CartPage 
{
         page : Page;
         cartProducts: Locator;
         products: Locator;
         productsText: Locator;
         cart: Locator;
         orders: Locator;
         checkout: Locator;

constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator('div li');
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }

  
async verifyProductIsDisplayed(productName:string) {
  const product = this.getProductLocator(productName);
  await product.waitFor(); // ✅ Wait only for the specific product
  const bool = await product.isVisible();
  await expect(bool).toBeTruthy(); // ✅ Correct assertion
}


  async checkOut() {
    await this.checkout.click();
  }

  getProductLocator(productName:string) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
}

module.exports = { CartPage };
