import { Locator, Page } from "playwright-core";
import BasePage from "../pages/BasePage";

export default class SignUpForm extends BasePage {
  private readonly modalTitle: Locator = this.page.getByText('Registration');
  private readonly nameField: Locator = this.page.locator('//input[@id="signupName"]');
  private readonly nameLastField: Locator = this.page.locator('//input[@id="signupLastName"]');
  private readonly emailField: Locator = this.page.locator('//input[@id="signupEmail"]');
  private readonly passwordField: Locator = this.page.locator('//input[@id="signupPassword"]');
  private readonly repeatPasswordField: Locator = this.page.locator('//input[@id="signupRepeatPassword"]');
  private readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
  private readonly closeModalButton: Locator = this.page.locator('//button[@aria-label="Close"]');
  private readonly errorBorderColor: string = 'rgb(220, 53, 69)';

 
  
  async fillName(name: string): Promise<any> {
    await this.nameField.fill(name);
    await this.nameField.blur();
  }
  async fillLastName(lastName: string): Promise<any> {
    await this.nameLastField.fill(lastName);
    await this.nameLastField.blur();
  }

  async fillEmail(email: string): Promise<any> {
    await this.emailField.fill(email);
    await this.emailField.blur();
  }

  async fillPassword(password: string): Promise<any> {
    await this.passwordField.fill(password);
    await this.passwordField.blur();
  }

  async fillRepeatPassword(password: string): Promise<any> {
    await this.repeatPasswordField.fill(password);
    await this.repeatPasswordField.blur();
  }

  async isRegisterButtonEnabled(): Promise<boolean> {
    return this.registerButton.isEnabled();
  }

  async submitForm(): Promise<any> {
    await this.registerButton.click();
  }

  async getErrorBorderColor(): Promise<any> {
    return this.errorBorderColor;
  }

  async closeModal(): Promise<any> {
    await this.closeModalButton.click();
}
}