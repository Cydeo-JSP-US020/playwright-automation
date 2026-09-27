import { expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('File downloads', async ({ page }) => {
    // create evenet listener for download
    let promisedDownloadEvent = page.waitForEvent("download");

    await page.goto("https://the-internet-5chk.onrender.com/download");

    await page.click("text='Insurance.jpg'"); // triggers the download event

    let download = await promisedDownloadEvent;

    let donwloadPath = path.join(__dirname, "./downloads", download.suggestedFilename());

    await download.saveAs(donwloadPath);

    expect(fs.existsSync(donwloadPath)).toBeTruthy();

});



test('File uploads', async ({ page }) => {

    await page.goto("https://the-internet-5chk.onrender.com/upload");

    let filePath = path.join(__dirname, "./uploads", "TestUpload.txt");

    await page.waitForTimeout(3000);

    await page.setInputFiles("//input[@id='file-upload']", filePath);

    await page.waitForTimeout(3000);

    await page.click("//input[@id='file-submit']");

    await page.waitForTimeout(3000);

    await expect(page.getByText("File Uploaded!")).toBeVisible();

  
});