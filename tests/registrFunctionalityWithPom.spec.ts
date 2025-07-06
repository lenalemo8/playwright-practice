import test from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { SignUpForm } from '../pom/forms/SignUpForm';


test.describe('SignUp form', () => {

  let homePage: HomePage;
  let signUpForm: SignUpForm;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage (page);
    signUpForm = new SignUpForm(page);
    await homePage.open();
    await homePage.clickSignUpButton();
  });

  test('should open the sign up form and verify elements', async () => {
    await signUpForm.verifyFormVisible();
    await signUpForm.closeForm();    
  });


  test.describe('Field: Name', () => {
    test('should show error when empty', async ({ page }) => {
      await signUpForm.focusAndBlurField(signUpForm.nameField);
      await signUpForm.checkRequiredError(signUpForm.nameField, 'Name required');
    });

    test('should trim input and validate length', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameField, ' H ');
      await signUpForm.checkInvalidError(signUpForm.nameField, 'Name is invalid');
    });

    test('should show error if name is longer than 20 characters', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameField, 'TwentyTwentyTwentyOne');
      await signUpForm.checkLengthError(signUpForm.nameField, 'Name has to be from 2 to 20 characters long');
    });

    test('should show error for invalid data', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameField, 'Hї');
      await signUpForm.checkInvalidError(signUpForm.nameField, 'Name is invalid');
    });

    test('should accept valid input', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameField, 'Helen');
      await signUpForm.checkValid(signUpForm.nameField);
    });
  });
  test.describe('Field: Last name', () => {
    test('should show error when empty', async ({ page }) => {
      await signUpForm.focusAndBlurField(signUpForm.nameLastField);
      await signUpForm.checkRequiredError(signUpForm.nameLastField, 'Last name required');
    });

    test('should trim input and validate length', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameLastField, ' H ');
      await signUpForm.checkInvalidError(signUpForm.nameLastField, 'Last name is invalid');
    });

    test('should show error if name is longer than 20 characters', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameLastField,'TwentyTwentyTwentyOne');
      await signUpForm.checkLengthError(signUpForm.nameLastField, 'Last name has to be from 2 to 20 characters long');
    });

    test('should show error for invalid data', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameLastField, 'Hї');
      await signUpForm.checkInvalidError(signUpForm.nameLastField, 'Last name is invalid');
    });

    test('should accept valid input', async ({ page }) => {
      await signUpForm.fillField(signUpForm.nameLastField, 'Elkin');
      await signUpForm.checkValid(signUpForm.nameLastField);
    });
  });
  test.describe('Field: Email', () => {
    test('should show error when empty', async ({ page }) => {
      await signUpForm.focusAndBlurField(signUpForm.emailField);
      await signUpForm.checkRequiredError(signUpForm.emailField, 'Email required');
    });

    test('should show error for invalid format', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'wrongEmail');
      await signUpForm.checkEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should show error when email is missing "@" symbol', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'userexample.com');
      await signUpForm.checkEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should show error when email is missing domain extension', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'user@domain');
      await signUpForm.checkEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should show error when email contains spaces', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'user @example.com');
      await signUpForm.checkEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should show error when email contains invalid characters', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'user@exa!mple.com');
      await signUpForm.checkEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should accept valid email with subdomain', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'user123@mail.example.com');
      await signUpForm.checkNoEmailError(signUpForm.emailField, 'Email is incorrect');
    });

    test('should accept valid input', async ({ page }) => {
      await signUpForm.fillField(signUpForm.emailField, 'helen@elkin.com');
      await signUpForm.checkValid(signUpForm.emailField);
    });
  });
  test.describe('Field: Password', () => {

    test('should show error when empty', async ({ page }) => {
      await signUpForm.focusAndBlurField(signUpForm.passwordField);
      await signUpForm.checkRequiredError(signUpForm.passwordField, 'Password required')
    });

    test('should validate password strength', async ({ page }) => {
      await signUpForm.fillField(signUpForm.passwordField, 'weakpass');
      await signUpForm.checkPasswordError(signUpForm.passwordField, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('should accept strong password', async ({ page }) => {
      await signUpForm.fillField(signUpForm.passwordField, 'Strong1Pass');
      await signUpForm.checkValid(signUpForm.passwordField);
    });
  });
  test.describe('Field: Re-enter password', () => {
    test('should show error when empty', async ({ page }) => {
      await signUpForm.focusAndBlurField(signUpForm.repeatPasswordField);
      await signUpForm.checkRequiredError(signUpForm.repeatPasswordField, 'Re-enter password required');
    });

    test('should show mismatch error', async ({ page }) => {
      await signUpForm.fillAndVerifyPasswordFields(
        signUpForm.passwordField,
        signUpForm.repeatPasswordField,
        'Strong1Pass',
        'Strong2Pass'
      );
      await signUpForm.checkMismatchError(signUpForm.repeatPasswordField, 
        'Passwords do not match'
      );
    });

    test('should show error for password with no numbers', async ({ page }) => {
      await signUpForm.fillField(signUpForm.passwordField, 'StrongPass');
      await signUpForm.checkPasswordError(signUpForm.passwordField, 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('should accept matching passwords', async ({ page }) => {
      await signUpForm.fillAndVerifyPasswordFields(
        signUpForm.passwordField,
        signUpForm.repeatPasswordField,
        'Strong3Pass',
        'Strong3Pass'
      );
      await signUpForm.checkValid(signUpForm.passwordField);
    });
  });
  test.describe('Register Button', () => {

    test('should be enabled when all fields are valid', async ({ page }) => {
      await signUpForm.fillValidRegistrationForm ();
      await signUpForm.registerButtonIsActive();
    });

    test('should submit form when clicked and valid', async ({ page }) => {
      await signUpForm.fillValidRegistrationForm ();
      await signUpForm.registerButtonIsActive();
      await signUpForm.submitRegistrationForm();
      await signUpForm.verifyGaragePageURL(page);
    });
  });
})