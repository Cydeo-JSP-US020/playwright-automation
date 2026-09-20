import { test } from "@playwright/test";

test.describe("Test Group", () => {

  // create beforeEach to navigate to https://practice.cydeo.com/
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
  });


  test("Check(): checks the radio button and check boxes if they haven't been checked yet", async ({ page }) => {

    // let checkboxesLink = page.locator("text='Checkboxes'");
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    // pause for 3 seconds.

    let checkbox1 = page.locator("//input[@id='box1']");

    await checkbox1.check();
   
  });

  test("Uncheck: unchecks the radio button and check boxes if they haven't been unchecked yet", async ({ page }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    await checkboxesLink.click();

    let checkbox2 = page.locator("#box2");

    await checkbox2.uncheck();


  });

  test("SelectOption(): used for dropdown boxes with select tagname", async ({ page }) => {
    
    let dropdownLink = page.getByText("Dropdown");
    await dropdownLink.click();

    let simpleDropdown = page.locator("//select[@id='dropdown']");

    // await simpleDropdown.selectOption("1"); // selecting by the value.
    // await simpleDropdown.selectOption({label: "Option 1"}); // selecting by text
    await simpleDropdown.selectOption({index: 1}); // selecting by index


  });

});
