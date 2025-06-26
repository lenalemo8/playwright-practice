import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
    private readonly signUpButton: Locator;

    constructor(page: Page) {
      super(page);
      this.signUpButton = page.locator('//button[text()="Sign up"]');  
    }

    async open (): Promise<void> {
        await this.page.goto('/');
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }
};