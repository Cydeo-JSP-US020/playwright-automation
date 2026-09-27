import { test, expect } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('Payment Plan Page Tests', () => {

    test.beforeEach(async ({ page }) => { // Ensure the user is on the enrollment page.

        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(page);
        
    })

  test('Verify that Step 2 stepper is blue and Step 1 stepper is green', async ({ page }) => {
    const step1StepperCircle = page.locator('.step-circle').nth(0);
    const step2StepperCircle = page.locator('.step-circle').nth(1);

    await expect(step1StepperCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)');
    await expect(step2StepperCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
  });

  test('Verify that the Next button is disabled by default', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next', exact: true }).last();

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeDisabled();
  });

  test('Verify that the Next button becomes enabled when a payment plan is selected', async ({ page }) => {
    await page.getByRole('button', { name: /Upfront/ }).click();
    const nextButton = page.getByRole('button', { name: 'Next', exact: true }).last();

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });


  test('Verify Clicking the active next button will change the stepper 2 color to green', async ({ page }) => {
    await page.getByRole('button', { name: /5 Installments/ }).click();

    const nextButton = page.getByRole('button', { name: 'Next', exact: true }).last();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    const step2StepperCircle = page.locator('.step-circle').nth(1);
    const step3StepperCircle = page.locator('.step-circle').nth(2);

    await expect(step2StepperCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)');
    await expect(step3StepperCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
  });

});