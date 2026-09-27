import { test, expect } from '@playwright/test';

test('iframe test', async ({page}) => {

    await page.goto("https://the-internet-5chk.onrender.com/iframe");

    let myFrame = page.frameLocator("iframe#mce_0_ifr");

    let elementInsideTheFrame = myFrame.locator("//body[@id='tinymce']");

  //  await page.waitForTimeout(3000);

    await elementInsideTheFrame.clear();
   // await elementInsideTheFrame.press("Control+A", "delete");

  //  await page.waitForTimeout(3000);

    await elementInsideTheFrame.fill("Hello CYDEO");

  //  await page.waitForTimeout(3000);

    await expect(elementInsideTheFrame).toHaveText("Hello CYDEO");
    
});