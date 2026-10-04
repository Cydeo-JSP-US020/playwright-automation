import { test, firefox } from '@playwright/test';

test('Context fixture', async ({ context }) => {

    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    const page4 = await context.newPage();

    await page1.waitForTimeout(3000);

    await page1.bringToFront();
    page1.goto('https://www.youtube.com/');
    await page1.waitForTimeout(3000);

    await page2.bringToFront();
    page2.goto('https://www.facebook.com/');
    await page2.waitForTimeout(3000);

    await page3.bringToFront();
    page3.goto('https://www.google.com/');
    await page3.waitForTimeout(3000);

    await page4.bringToFront();
    page4.goto('https://www.github.com/');
    await page4.waitForTimeout(3000);

});


test('Browser fixture', async ({ browser }) => {

    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context1.newPage();

    const page3 = await context2.newPage();
    const page4 = await context2.newPage();

    await page1.waitForTimeout(3000);

    await page1.bringToFront();
    page1.goto('https://www.youtube.com/');
    await page1.waitForTimeout(3000);

    await page2.bringToFront();
    page2.goto('https://www.facebook.com/');
    await page2.waitForTimeout(3000);

    await page3.bringToFront();
    page3.goto('https://www.google.com/');
    await page3.waitForTimeout(3000);

    await page4.bringToFront();
    page4.goto('https://www.github.com/');
    await page4.waitForTimeout(3000);

});


test('Custom fixture @custom-fixture', async () => {

    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.youtube.com/');
    await page.waitForTimeout(5000);



});