import { Locator } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { step } from "../utils/step-decorators";

export class SignInForm extends BasePage {

    private readonly emailField: Locator = this.page.locator('//input[@id="signinEmail"]');
    private readonly passwordField: Locator = this.page.locator('//input[@id="signinPassword"]');
    private readonly loginButton: Locator = this.page.locator('//app-signin-modal//button[@class="btn btn-primary"]');

    async enterEmail(email: string): Promise<any> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<any> {
        await this.passwordField.fill(password);
    }

    async clickLoginButton(): Promise<any> {
        await this.loginButton.click();
    }

    @step(`Login with credentials`)
    async loginWithCredentials(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async triggerEmptyErrorOnField(fieldName: string): Promise<any> {
        const element = fieldName === 'email' ? this.emailField : this.passwordField;
        await element.focus();
        await element.blur();
    }


}