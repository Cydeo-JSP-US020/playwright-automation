
import { test, expect } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('Start Application Page tests', () => {

    test.beforeEach(async ({ page }) => { // Ensure the user is on the enrollment page.
        await CommonUI.login(page);
    })
    

  test('Verify that clicking the Terms & Conditions link opens a new Terms & Conditions tab', async ({ page }) => {

    let popupEvent = page.waitForEvent("popup");

    let termsAndConditionsLink = page.getByRole('link', { name: 'Terms and conditions' });

    // verify that the link is visible and enabled
    await expect(termsAndConditionsLink).toBeVisible();
    await expect(termsAndConditionsLink).toBeEnabled();

    await termsAndConditionsLink.click();

    const newPage = await popupEvent;

    const termsPagesHeader = newPage.getByRole('heading', { name: 'Terms and Conditions' });

    await expect(termsPagesHeader).toBeVisible();

  });


  test('Verify that the first stepper is blue initially and changes to green once Step 1 is completed', async ({ page }) => {

    let step1StepperCircle = page.locator("//div[@class='step-circle'][span[normalize-space()='1']]");   // Eman
    let step2StepperCircle = page.locator('#stepper1 .step').nth(1).locator('.step-circle');; // Paul

    await CommonUI.completeStartApplicationStep(page, 'John', 'Doe', 'johndoe@example.com', '1234567890', 'Email');

    await expect(step1StepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");

    await expect(step2StepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");

  });

  test('Complete the start application step with default personal details', async ({ page }) => {
    await CommonUI.completeStartApplicationStep(page);

    const step2StepperCircle = page.locator('#stepper1 .step').nth(1).locator('.step-circle');
    await expect(step2StepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
  });


  test('Verify that personal input fields are enabled and accept user input', async ({ page }) => {

    const firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    const lastNameInput = page.locator("//input[@formcontrolname='lastName']");
    const emailInput = page.locator("//input[@formcontrolname='email']");
    const phoneInput = page.locator("//input[@formcontrolname='phoneNumber']");

    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'johndoe@example.com';
    const phoneNumber = '1234567890';

    await expect(firstNameInput).toBeVisible();
    await expect(firstNameInput).toBeEnabled();
    await expect(lastNameInput).toBeVisible();
    await expect(lastNameInput).toBeEnabled();
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toBeEnabled();
    await expect(phoneInput).toBeVisible();
    await expect(phoneInput).toBeEnabled();

    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await phoneInput.fill(phoneNumber);

    await expect(firstNameInput).toHaveValue(firstName);
    await expect(lastNameInput).toHaveValue(lastName);
    await expect(emailInput).toHaveValue(email);
    await expect(phoneInput).toHaveValue(phoneNumber);

  });


});
