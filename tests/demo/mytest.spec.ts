import { test, expect } from "@playwright/test";

test("Should load homepage with correct title", async ({ page }) => {
  //1. Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  // steps..
  await page.locator("//h1").click();
});

test.only("Should demo locators", async ({ page }) => {
  // page.geyBy*() and page.locator() methods returns the locator object
  // The above methods not to be awaited
  // Thetype of locator is an object
  // Locators are Lazy until an action is fired on them

  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on Make Appointment
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" });
  await makeAppmtBtn.click();
  await expect(page.getByText("Please login to make")).toBeVisible();
});
