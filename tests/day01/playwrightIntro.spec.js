//const {test} = require("@playwright/test");

import {test} from "@playwright/test";

test("Simple google test", async ({page}) => {
    // test codes
    await page.goto("https://www.google.com");

    await page.waitForTimeout(3000);

});
