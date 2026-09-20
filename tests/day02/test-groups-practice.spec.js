import {test} from "@playwright/test"

test.describe("Practice.cydeo", () => {

    test.beforeEach(async ({page}) => {
        await page.goto("https://the-internet-5chk.onrender.com/")
    });

    test.afterEach(async ({page}) => {
        await page.waitForTimeout(3000);
    });

    test("title of page", async ({ page }) => {

        console.log( await page.title() );

    });

    test("url of page", async ({ page }) => {

        console.log( page.url());

    });


});





