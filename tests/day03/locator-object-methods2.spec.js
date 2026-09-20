import { test } from "@playwright/test";

test.describe("Test Group", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
  });

  test("innerText(): retrives the visible text", async ({ page }) => {
    let headerElement = page.locator("//h1/span[@class='h1y']");

    let actualText = await headerElement.innerText();

    console.log(actualText);

  });

  test("inputValue(): only works with <input>, <textarea>, <select>, retrives the input value", async ({ page }) => {
   
    let inputsLink = page.getByText("Inputs");
    await inputsLink.click();

    let inputBox = page.locator("//input[@type='number']");

    await page.waitForTimeout(3000);

    await inputBox.fill("123");

    await page.waitForTimeout(3000);

    let actualInput = await inputBox.inputValue();

    console.log(actualInput);


  });

  test("getAttribute(): retrieves the attribute value", async ({ page }) => {
    
    let abTestingLink = page.locator("text='A/B Testing'"); 

     let hrefLink = await abTestingLink.getAttribute("href");

     console.log(hrefLink);

  });

});
