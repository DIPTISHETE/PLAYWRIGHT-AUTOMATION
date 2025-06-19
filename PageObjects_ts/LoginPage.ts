import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  page: Page;
  signInButton: Locator;
  userNameField: Locator;
  passwordField: Locator;

  constructor(page) {
    this.page = page;
    this.signInButton = page.locator('[value="Login"]');
    this.userNameField = page.locator("#userEmail");
    this.passwordField = page.locator("#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username: string, password: string) {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    // Wait for all network requests to finish
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
