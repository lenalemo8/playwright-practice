import { test, expect, Locator } from '@playwright/test';
import { fillValidRegistrationForm } from '../pom/utils/userGeneration';
import HomePage from '../pom/pages/HomePage';
import SignUpForm from '../pom/forms/SignUpForm';
let homePage: HomePage;
let signUpForm: SignUpForm;



test.describe('SignUp  form', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage (page);
    signUpForm = new SignUpForm(page);
    await homePage.open();
    await homePage.clickSignUpButton();
  })
test('should open the sign up form', async () => {
        await expect(signUpForm).toBeVisible();
    });
});

test.describe('SignUp  form', () => {

  let signUpButton: Locator;
  let modalTitle: Locator;
  let nameField: Locator;
  let nameLastField: Locator;
  let emailField: Locator;
  let passwordField: Locator;
  let repeatPasswordField: Locator;
  let registerButton: Locator;
  let closeModalButton: Locator;
  let errorBorderColor: string;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://qauto.forstudy.space/');
    signUpButton = page.locator('//button[text()="Sign up"]');
    await signUpButton.click();

    modalTitle = page.getByText('Registration');
    nameField = page.locator('//input[@id="signupName"]');
    nameLastField = page.locator('//input[@id="signupLastName"]');
    emailField = page.locator('//input[@id="signupEmail"]');
    passwordField = page.locator('//input[@id="signupPassword"]');
    repeatPasswordField = page.locator('//input[@id="signupRepeatPassword"]');
    registerButton = page.getByRole('button', { name: 'Register' });
    closeModalButton = page.locator('//button[@aria-label="Close"]');
    errorBorderColor = 'rgb(220, 53, 69)';

  });

    test ('Opens registration form and displays elements', async ({ page }) => {

      await expect(modalTitle).toBeVisible();
      await expect(nameField).toBeVisible();
      await expect(nameLastField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(repeatPasswordField).toBeVisible();
      await expect(registerButton).toBeDisabled();

      await closeModalButton.click();
      await expect(modalTitle).not.toBeVisible();
    });

  test.describe('Field: Name', () => {
    test('should show error when empty', async ({ page }) => {
      await nameField.focus();
      await nameField.blur();
      await expect(page.getByText('Name required')).toBeVisible();
      await expect(nameField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should trim input and validate length', async ({ page }) => {
      await nameField.fill(' H ');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
      await expect(nameField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error if name is longer than 20 characters', async ({ page }) => {
      await nameField.fill('TwentyTwentyTwentyOne');
      await nameField.blur();
      await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
      await expect(nameField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error for invalid data', async ({ page }) => {
      await nameField.fill('Hї');
      await nameField.blur();
      await expect(page.getByText('Name is invalid')).toBeVisible();
      await expect(nameField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should accept valid input', async ({ page }) => {
      await nameField.fill('Helen');
      await nameField.blur();
      await expect(nameField.locator('.invalid-feedback')).toHaveCount(0);
    });
  });
  test.describe('Field: Last name', () => {
    test('should show error when empty', async ({ page }) => {
      await nameLastField.focus();
      await nameLastField.blur();
      await expect(page.getByText('Last name required')).toBeVisible();
      await expect(nameLastField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should trim input and validate length', async ({ page }) => {
      await nameLastField.fill(' H ');
      await nameLastField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();
      await expect(nameLastField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error if name is longer than 20 characters', async ({ page }) => {
      await nameLastField.fill('TwentyTwentyTwentyOne');
      await nameLastField.blur();
      await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
      await expect(nameLastField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error for invalid data', async ({ page }) => {
      await nameLastField.fill('Hї');
      await nameLastField.blur();
      await expect(page.getByText('Last name is invalid')).toBeVisible();
      await expect(nameLastField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should accept valid input', async ({ page }) => {
      await nameLastField.fill('Helen');
      await nameLastField.blur();
      await expect(nameLastField.locator('.invalid-feedback')).toHaveCount(0);
    });
  });
  test.describe('Field: Email', () => {
    test('should show error when empty', async ({ page }) => {
      await emailField.focus();
      await emailField.blur();
      await expect(page.getByText('Email required')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error for invalid format', async ({ page }) => {
      await emailField.fill('wrongEmail');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error when email is missing "@" symbol', async ({ page }) => {
      await emailField.fill('userexample.com');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error when email is missing domain extension', async ({ page }) => {
      await emailField.fill('user@domain');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error when email contains spaces', async ({ page }) => {
      await emailField.fill('user @example.com');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error when email contains invalid characters', async ({ page }) => {
      await emailField.fill('user@exa!mple.com');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).toBeVisible();
      await expect(emailField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should accept valid email with subdomain', async ({ page }) => {
      await emailField.fill('user123@mail.example.com');
      await emailField.blur();
      await expect(page.getByText('Email is incorrect')).not.toBeVisible();
    });

    test('should accept valid input', async ({ page }) => {
      await emailField.fill('helen@elkin.com');
      await emailField.blur();
      await expect(emailField.locator('.invalid-feedback')).toHaveCount(0);
    });
  });
  test.describe('Field: Password', () => {

    test('should show error when empty', async ({ page }) => {
      await passwordField.focus();
      await passwordField.blur();
      await expect(page.getByText('Password required')).toBeVisible();
      await expect(passwordField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should validate password strength', async ({ page }) => {
      await passwordField.fill('weakpass');
      await passwordField.blur();
      await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
      await expect(passwordField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should accept strong password', async ({ page }) => {
      await passwordField.fill('Strong1Pass');
      await passwordField.blur();
      await expect(page.getByText('Password has to')).not.toBeVisible();
    });
  });
  test.describe('Field: Re-enter password', () => {

    test('should show error when empty', async ({ page }) => {
      await repeatPasswordField.focus();
      await repeatPasswordField.blur();
      await expect(page.getByText('Re-enter password required')).toBeVisible();
      await expect(repeatPasswordField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show mismatch error', async ({ page }) => {
      await passwordField.fill('Strong1Pass');
      await repeatPasswordField.fill('Strong2Pass');
      await repeatPasswordField.blur();
      await expect(page.getByText('Passwords do not match')).toBeVisible();
      await expect(repeatPasswordField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should show error for password with no numbers', async ({ page }) => {
      await passwordField.fill('StrongPass');
      await passwordField.blur();
      await expect(page.getByText('Password has to')).toBeVisible();
      await expect(passwordField).toHaveCSS('border-color', errorBorderColor);
    });

    test('should accept matching passwords', async ({ page }) => {
      await passwordField.fill('Strong1Pass');
      await repeatPasswordField.fill('Strong1Pass');
      await repeatPasswordField.blur();
      await expect(page.getByText('Passwords do not match')).not.toBeVisible();
    });
  });
  test.describe('Register Button', () => {

    test('should be disabled when form is invalid', async ({ page }) => {
      await expect(registerButton).toBeVisible();
      await expect(registerButton).toBeDisabled();
    });

    test('should be enabled when all fields are valid', async ({ page }) => {
      const { firstName, lastName, email, password } = fillValidRegistrationForm();

      await nameField.fill(firstName);
      await nameLastField.fill(lastName);
      await emailField.fill(email);
      await passwordField.fill(password);
      await repeatPasswordField.fill(password);
      await expect(registerButton).toBeEnabled();
    });

    test('should submit form when clicked and valid', async ({ page }) => {
      const { firstName, lastName, email, password } = fillValidRegistrationForm();

      await nameField.fill(firstName);
      await nameLastField.fill(lastName);
      await emailField.fill(email);
      await passwordField.fill(password);
      await repeatPasswordField.fill(password);
      await expect(registerButton).not.toBeDisabled();
      await registerButton.click();
      await expect(page).toHaveURL(/\/garage/);
    });
  });
})

