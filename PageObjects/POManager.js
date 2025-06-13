const {LoginPage} = require ('../PageObjects/LoginPage');
const {DashboardPage} = require ('../PageObjects/DashboardPage');
const {CartPage} = require ('../PageObjects/CartPage');
const {OrderHistoryPage} = require ('../PageObjects/OrderHistoryPage');
const { OrderReviewPage } = require('../PageObjects/OrderReviewPage');

class POManager {
  constructor(page) {

    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage =  new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
//     this.orderhistoryPage  = new OrderHistoryPage (this.page);
    this.orderreviewPage = new OrderReviewPage (this.page)
  }

getLoginPage ()
{
         return this.loginPage ;      
}

getDashboardPage ()
{
         return this.dashboardPage ;      
}

getCartPage ()
{
                return this.cartPage ;
}

getOrderReviewPage ()
{
       return this.orderreviewPage ;       
}


// getOrderHistoryPage ()
// {
//                 return this.orderhistoryPage ;
// }




}

module.exports = { POManager };
