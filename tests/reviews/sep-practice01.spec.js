
import { test } from '@playwright/test';

test.describe('Start Application Page tests', () => {

    test.beforeEach(async ({ page }) => { // Ensure the user is on the enrollment page.

        
        const CREDENTIALS = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString('base64');

        await page.setExtraHTTPHeaders( {'Authorization': `Basic ${CREDENTIALS}`} );

        await page.goto(process.env.SEP_QA_URL);
        
    })
    

  test('Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab', async ({ page }) => {
  });


  test('Verify that the first stepper is blue initially and changes to green once Step 1 is completed', async ({ page }) => {
  });


  test('Verify that personal input fields are enabled and accept user input', async ({ page }) => {
  });


});
