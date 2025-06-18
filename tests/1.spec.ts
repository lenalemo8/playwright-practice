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

    await expect(modalTitle).toBeVisible();
    await expect(nameField).toBeVisible();
    await expect(page.locator('//input[@id="signupLastName"]')).toBeVisible();
    await expect(page.locator('//input[@id="signupEmail"]')).toBeVisible();
    await expect(page.locator('//input[@id="signupPassword"]')).toBeVisible();
    await expect(page.locator('//input[@id="signupRepeatPassword"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    await page.getByText('×').click();
    await expect(page.getByText('Registration')).not.toBeVisible();
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click({
      button: 'right'
    });
    await page.getByText('NameLast nameEmailPasswordRe-').click();
    await page.locator('#signupLastName').click();
    await page.getByRole('textbox', { name: 'Password', exact: true }).click();
    await page.getByRole('textbox', { name: 'Re-enter password' }).click();
    });

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