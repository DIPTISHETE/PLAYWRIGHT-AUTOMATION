import { test as baseTest } from "@playwright/test";

interface testDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{
  testDataForOrder: testDataForOrder;
}>({
  testDataForOrder: {
    username: "saloni10@gmail.com",
    password: "Saloni@9696",
    productName: "ZARA COAT 3",
  },
});
