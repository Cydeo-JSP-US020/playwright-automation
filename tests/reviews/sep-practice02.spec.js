import { test } from '@playwright/test';

test.describe('Payment Plan Page Tests', () => {

    test.beforeEach(async ({ page }) => { // Ensure the user is on the enrollment page.

        
        const CREDENTIALS = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString('base64');

        await page.setExtraHTTPHeaders( {'Authorization': `Basic ${CREDENTIALS}`} );

        await page.goto(process.env.SEP_QA_URL);
        
    })

  test('Verify that Step 2 stepper is blue and Step 1 stepper is green', async ({ page }) => {
  });

  test('Verify that the Next button is disabled by default', async ({ page }) => {
  });

  test('Verify that the Next button becomes enabled when a payment plan is selected', async ({ page }) => {
  });


  test('Verify Clicking the active next button will change the stepper 2 color to green', async ({ page }) => {
  });

});