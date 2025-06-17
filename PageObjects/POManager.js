const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const { CartPage } = require('../PageObjects/CartPage');
const { OrderReviewPage } = require('../PageObjects/OrderReviewPage');
// const { OrderHistoryPage } = require('../PageObjects/OrderHistoryPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderReviewPage = new OrderReviewPage(this.page);
    // this.orderHistoryPage = new OrderHistoryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderReviewPage() {
    return this.orderReviewPage;
  }

  // getOrderHistoryPage() {
  //   return this.orderHistoryPage;
  // }
}

module.exports = { POManager };
