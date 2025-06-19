import { test, expect } from '@playwright/test';
import { fillValidRegistrationForm } from '../pom/utils/userGeneration';

test.describe('SignUp  form', () => {
  test.beforeEach(async ({ page }) => {
    const signUpButton = page.locator('//button[text()="Sign up"]');
    await page.goto('https://qauto.forstudy.space/');
    await signUpButton.click();
  });

    test.only('opens registration form and displays elements', async ({ page }) => {
    const modalTitle = page.getByText('Registration');
    const nameField = page.locator('//input[@id="signupName"]');
    const nameLastField = page.locator('//input[@id="signupLastName"]');
    const emailField = page.locator('//input[@id="signupEmail"]');
    const passwordField = page.locator('//input[@id="signupPassword"]');
    const repeatPasswordField = page.locator('//input[@id="signupRepeatPassword"]');
    const registerButton = page.locator('//button[contains(@class, "btn-primary")]');
    const closeModalButton = page.locator('//button[@aria-label="Close"]');
    
    await expect(modalTitle).toBeVisible();
    await expect(nameField).toBeVisible();
    await expect(nameLastField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(repeatPasswordField).toBeVisible();
    await expect(registerButton).toBeDisabled();

    await closeModalButton.click();
    await expect(modalTitle).not.toBeVisible();
   
    test.describe('Field: Name', () => {
    test('should show error when empty', async ({ page }) => {
      await page.locator('#signupName').focus();
      await page.locator('#signupName').blur();
      await expect(page.getByText('Name required')).toBeVisible();
    });

    test('should trim input and validate length', async ({ page }) => {
      await page.locator('#signupName').fill(' H ');
      await page.locator('#signupName').blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('should show error if name is longer than 20 characters', async ({ page }) => {
      await page.locator('#signupName').fill('TwentyTwentyTwentyOne');
      await page.locator('#signupName').blur();
      await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    test('should show error for invalid data', async ({ page }) => {
      await page.locator('#signupName').type('Hї');
      await page.locator('#signupName').blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('should accept valid input', async ({ page }) => {
      await page.locator('#signupName').fill('Helen');
      await page.locator('#signupName').blur();
      await expect(page.locator('#signupName').locator('.invalid-feedback')).toHaveCount(0);
    });
  });

})
})
