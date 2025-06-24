import { Locator, Page, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';


export default class SignUpForm extends HomePage {

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


  async checkNameRequiredError(): Promise<void> {
    await expect(this.nameField).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText('Name required')).toBeVisible();
  }
  async checkNameInvalidError(): Promise<void> {
    await expect(this.nameField).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText('Name is invalid')).toBeVisible();
  }
  async checkNameLengthError(): Promise<void> {
    await expect(this.nameField).toHaveCSS('border-color', this.errorBorderColor);
    await expect(this.page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  }
  async checkValidName(): Promise<void> {
    await expect(this.nameField.locator('.invalid-feedback')).toHaveCount(0);
  }
   async focusAndBlurNameField(): Promise<void> {
    await this.nameField.focus();
    await this.nameField.blur();
  }
   async fillName(value: string): Promise<void> {
    await this.nameField.fill(value);
    await this.nameField.blur();  
  }

} 







  async fillLastName(lastName: string): Promise<void> {
    await this.nameLastField.fill(lastName);
    await this.nameLastField.blur();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
    await this.emailField.blur();
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
    await this.passwordField.blur();
  }

  async fillRepeatPassword(password: string): Promise<void> {
    await this.repeatPasswordField.fill(password);
    await this.repeatPasswordField.blur();
  }

  async isRegisterButtonEnabled(): Promise<boolean> {
    return this.registerButton.isEnabled();
  }

  async submitForm(): Promise<void> {
    await this.registerButton.click();
  }

  async getErrorBorderColor(): Promise<string> {
    return this.errorBorderColor;
  }

  async closeModal(): Promise<void> {
    await this.closeModalButton.click();
}
}