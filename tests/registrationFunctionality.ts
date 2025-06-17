import { test, expect } from '@playwright/test';
import { fillValidRegistrationForm } from '../pom/utils/userGeneration';

test.describe('Accessibility of the form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero-descriptor_btn').click();
  });

    test('opens registration form and displays elements', async ({ page }) => {
    await expect(page.getByText('Registration')).toBeVisible();
    await expect(page.locator('#signupName')).toBeVisible();
    await expect(page.locator('#signupLastName')).toBeVisible();
    await expect(page.locator('#signupEmail')).toBeVisible();
    await expect(page.locator('#signupPassword')).toBeVisible();
    await expect(page.locator('#signupRepeatPassword')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();

    await page.getByText('×').click();
    await expect(page.getByText('Registration')).not.toBeVisible();
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