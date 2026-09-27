import { test } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('Payment Plan Page Tests', () => {

    test.beforeEach(async ({ page }) => { // Ensure the user is on the enrollment page.

        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page);
        
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