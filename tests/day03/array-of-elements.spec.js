import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {

  let elements;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
    elements = await page.locator("//ul[@class='list-group']/li/a").all()
  });

  test("Verify that there are exactly 50 link elements within the <ul> tag", async ({page,}) => {
    
    expect(elements.length).toBe(50);

    // expect(elements.length).toBeGreaterThanOrEqual(20);
  });

  test("Verify that each of the 50 link elements within the <ul> tag is visible & clickable", async ({page,}) => {

    for (let e of elements) {
      await expect(e).toBeVisible();
      //expect(await e.isVisible()).toBeTruthy();

      // ----------------------------------------------------------------
      await expect(e).toBeEnabled();
      //expect(await e.isEnabled()).toBeTruthy();
    }

  });

  test("Verify that each of the 50 link elements within the <ul> tag has a href attribute", async ({page}) => {
    
    for (let e of elements) {
       await expect(e).toHaveAttribute("href");
       console.log(await e.getAttribute("href"));
    }

  });

});

/*
1. Verify that there are exactly 50 link elements within the <ul> tag.

2. Verify that each of the 50 link elements within the <ul> tag is visible & clickable.

3. Verify that each of the 50 link elements within the <ul> tag has a href attribute.
*/
