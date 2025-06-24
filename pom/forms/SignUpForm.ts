import { Locator, Page, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { fillValidRegistrationForm } from '../utils/userGeneration';

export class SignUpForm extends HomePage {

  readonly modalTitle: Locator;
  readonly nameField: Locator;
  readonly nameLastField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly repeatPasswordField: Locator;
  readonly registerButton: Locator;
  readonly closeModalButton: Locator;
  readonly errorBorderColor: string;

  constructor(page: Page) {
    super(page);

    this.modalTitle = page.getByText('Registration');
    this.nameField = page.locator('#signupName');
    this.nameLastField = page.locator('#signupLastName');
    this.emailField = page.locator('#signupEmail');
    this.passwordField = page.locator('#signupPassword');
    this.repeatPasswordField = page.locator('#signupRepeatPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.closeModalButton = page.locator('button[aria-label="Close"]');
    this.errorBorderColor = 'rgb(220, 53, 69)';
  }

  async verifyFormVisible() {
    await expect(this.modalTitle).toBeVisible();
    await expect(this.nameField).toBeVisible();
    await expect(this.nameLastField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.repeatPasswordField).toBeVisible();
    await expect(this.registerButton).toBeDisabled();
  };
  async closeForm() {
    await this.closeModalButton.click();
    await expect(this.modalTitle).not.toBeVisible();
  }

  async focusAndBlurField(locator: Locator): Promise<void> {
    await locator.focus();
    await locator.blur();
  }

  async fillField(locator: Locator, value: string) {
    await locator.fill(value);
    await locator.blur();
  }
  
  async checkRequiredError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async checkInvalidError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async checkLengthError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async checkValid(locator: Locator) {
    await expect(locator.locator('.invalid-feedback')).toHaveCount(0);
  }

  async checkEmailError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }
  async checkPasswordError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async checkMismatchError(locator: Locator, message: string) {
    await expect(locator).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText(message)).toBeVisible();
  }
  async fillAndVerifyPasswordFields(passwordField: Locator, repeatPasswordField: Locator, password: string, repeatPassword: string) {
    await this.fillField(passwordField, password); 
    await this.fillField(repeatPasswordField, repeatPassword);
  } 
  async fillValidRegistrationForm() {
    const { firstName, lastName, email, password } = fillValidRegistrationForm();

    await this.nameField.fill(firstName);
    await this.nameLastField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(password);
  }  
  async registerButtonIsActive() {
    await expect(this.registerButton).toBeEnabled();
  }
  async submitRegistrationForm() {
    await expect(this.registerButton).toBeEnabled();
    await this.registerButton.click();
  }
  async verifyGaragePageURL(page: Page) {
    await expect(page).toHaveURL(/\/garage/);
  }
}
  // async checkNameRequiredError(): Promise<void> {                                    -------> /for a separate field can be used/
    //   await expect(this.nameField).toHaveCSS('border-color', this.errorBorderColor);
    //   await expect(this.page.getByText('Name required')).toBeVisible();
    // }
