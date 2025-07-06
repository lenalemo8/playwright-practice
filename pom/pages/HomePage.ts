import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage';


export class HomePage extends BasePage {
    private readonly signUpButton: Locator;
    private readonly signInButton: Locator = this.page.locator('//button[contains(@class,"header_signin")]');
    private readonly profileSidebarBtn: Locator = this.page.locator('//a[contains(@class, "sidebar_btn") and contains(@href, "/panel/profile")]');

    constructor(page: Page) {
        super (page);
        this.signUpButton = page.locator('//button[text()="Sign up"]');
    }
    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }
    async clickProfileSidebarBtn(): Promise<void> {
        await this.profileSidebarBtn.click();
    } 
    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }
}