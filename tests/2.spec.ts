import { test, expect } from '@playwright/test';
import { fillValidRegistrationForm } from '../pom/utils/userGeneration';

test.describe('SignUp  form', () => {
  test.beforeEach(async ({ page }) => {
    const signUpButton = page.locator('//button[text()="Sign up"]');
    await page.goto('https://qauto.forstudy.space/');
    await signUpButton.click();
  });
  
  test('opens registration form and displays elements', async ({ page }) => {
  await expect(page.getByText('Registration')).toBeVisible();
  await expect(page.locator('#signupName')).toBeVisible();
  await expect(page.locator('#signupLastName')).toBeVisible();
  await expect(page.locator('#signupEmail')).toBeVisible();
  await expect(page.locator('#signupPassword')).toBeVisible();
  await expect(page.locator('#signupRepeatPassword')).toBeVisible();
  await expect(page.locator('//button[contains(@class, "btn-primary")]')).toBeDisabled();

  await page.locator('//button[@aria-label="Close"]').click();
  await expect(page.getByText('Registration')).not.toBeVisible();
});
