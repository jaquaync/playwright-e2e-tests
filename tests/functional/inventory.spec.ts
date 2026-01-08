import { test, expect } from "@playwright/test";

/**
 * Scenario:
 * 1. Login as a standard user
 * 2. Get a list of products with its price
 * 3. Assert that all products have a non-zero dollar value
 *
 * @locators
 * 1. .inventory_item -> all products
 * 2. .inventory_item_name -> product names
 * 3. . inventory_item_price -> prices
 */

test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid credetials", async ({ page }) => {
    // Launch the webpage
    await page.goto("https://www.saucedemo.com/");

    // Login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("Should confirm all prices are non-zero values", async ({ page }) => {
    // Get a list of products
    let productsList = page.locator(".inventory_item");
    await expect(productsList).toHaveCount(6);

    // Get product name and prices
    let totalProducts = await productsList.count();

    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productsList.nth(i);

      // Product name
      let productName = await eleNode.locator(".inventory_item_name").innerText();

      // Price
      let price = await eleNode.locator(".inventory_item_price").innerText();

      // Print the results
      console.log(`Product: ${productName}, price: ${price}`);

      priceArr.push(price);
    }

    console.log(`Original Price Array: ${priceArr}`);

    /**
     * [$29.99,$9.99,$15.99,$49.99,$7.99,$15.99]
     * 1. Replace all dollar signs with "" empty string
     * 2. Compare the price which should be > 0 greater than 0
     * 
     * 29.99,9.99,15.99,49.99,7.99,15.99
     */
    let priceArrnum = priceArr.map((item) => parseFloat(item.replace("$", "")))
    console.log(`>>Modified arr: ${priceArrnum}`);

    let priceArrWithInvalidVals = priceArrnum.filter((item) => item <=0)

    if (priceArrWithInvalidVals.length > 0) {
        console.log(`ERROR: Zero price values found, ${priceArrWithInvalidVals}`);
    } else {
        console.log(`INFO: All prices are non-zero values`);
    }

    expect(priceArrWithInvalidVals).toHaveLength(0)
  });

    test('Select the first item on the products page and complete the order', async ({ page }) => {
        // Select the first item and add it to the cart
        let firstProduct = page.locator('.inventory_item').nth(0)
        await firstProduct.locator('button[data-test^="add-to-cart"]').click();

        // Go to the cart
        await page.locator('.shopping_cart_link').click();

        // Assert the item is in the cart
        await expect(page.locator('.cart_item')).toHaveCount(1);
  
        // Go to checkout and Enter user information
        await page.locator('#checkout').click();
        await page.locator('[data-test="firstName"]').fill('Jason');
        await page.locator('[data-test="lastName"]').fill('Brown');
        await page.locator('[data-test="postalCode"]').fill('28222');

        // Complete the checkout
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();

        // Assert the order confirmation message
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
});
});
