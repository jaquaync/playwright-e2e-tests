import { test, expect } from "@playwright/test"
import { log } from "../helpers/logger"
import HomePage from "../page-objects/nopcommerce.home.page";

test("Login to the Nopcommerce Web App", async ({page}, testInfo) => {
    // Env Config
    const envConfig = testInfo.project.use as any

    // Create a page object
    const homePage = new HomePage(page)

    // Login nopCommerceWeb
    await homePage.loginToNopeCommerceApp(
        envConfig.nopCommerceWeb, 
        process.env.NOP_COMMERCE_TEST_USERNAME, 
        process.env.NOP_COMMERCE_TEST_PASSWORD
    );
});