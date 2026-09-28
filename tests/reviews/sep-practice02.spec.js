import { test, expect } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('Payment Plan Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await CommonUI.login(page);
    await CommonUI.completeStartApplicationStep(page);
  });

  test('Verify that Step 2 stepper is blue and Step 1 stepper is green', async ({ page }) => {
    const step1StepperCircle = page.locator('#stepper1 .step').nth(0).locator('.step-circle');
    const step2StepperCircle = page.locator('#stepper1 .step').nth(1).locator('.step-circle');

    await expect(step1StepperCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)');
    await expect(step2StepperCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
  });

  test('Verify that the Next button is disabled by default', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next', exact: true });

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeDisabled();
  });

  test('Verify that the Next button becomes enabled when a payment plan is selected', async ({ page }) => {
    await page.getByRole('button', { name: /Upfront/ }).click();

    const nextButton = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });

  test('Verify clicking the active Next button advances Step 2 to green', async ({ page }) => {
    await page.getByRole('button', { name: /5 Installments/ }).click();

    const nextButton = page.getByRole('button', { name: 'Next', exact: true });
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    const step2StepperCircle = page.locator('#stepper1 .step').nth(1).locator('.step-circle');
    const step3StepperCircle = page.locator('#stepper1 .step').nth(2).locator('.step-circle');

    await expect(step2StepperCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)');
    await expect(step3StepperCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
  });
});