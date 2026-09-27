import { test } from "@playwright/test";

test.describe("Test Group", () => {

    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/javascript_alerts");
    });

    test("Regular Alert", async ({ page }) => {

        page.on("dialog", async (alert) => {
            console.log(`Alert Message: ${alert.message()}`);
            // await page.waitForTimeout(3000);
            await alert.accept();
        });

        let clickForJSAlertButton = page.locator("//button[@onclick='jsAlert()']");
        await clickForJSAlertButton.click();

       // await page.waitForTimeout(3000);
        
    });

    test("Confirmation Alert", async ({ page }) => {

        page.on("dialog", async (alert) => {
            console.log(`Alert Message: ${alert.message()}`);
           // await page.waitForTimeout(3000);
            await alert.dismiss();
        });

        let clickForJSConfirmAlertButton = page.locator("//button[contains(text(), 'JS Confirm')]");
        await clickForJSConfirmAlertButton.click();
        
      //  await page.waitForTimeout(3000);

    });

    test("Prompt Alert", async ({ page }) => {

        page.on("dialog", async (alert) => {
            console.log(`Alert Message: ${alert.message()}`);
           // await page.waitForTimeout(3000);
            await alert.accept("CYDEO");
        });

        let clickForJSPromptAlertButton = page.locator("//button[@onclick='jsPrompt()']");
        await clickForJSPromptAlertButton.click();

      //  await page.waitForTimeout(3000);
       
    });

});