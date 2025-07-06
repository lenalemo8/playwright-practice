import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from './BasePage';


export class ProfilePage extends BasePage {
    private readonly profileHeder: Locator = this.page.locator('//h1', { hasText: 'Profile' });
    private readonly editProfileBtn: Locator = this.page.locator('//button[contains(@class, "btn-primary") and text()="Edit profile"]');
    private readonly profilePhoto: Locator = this.page.locator('//img[contains(@class, "profile_photo")]');
    private readonly profileName: Locator = this.page.locator('//p[contains(@class, "profile_name")]');



    async open(): Promise<void> {
        await this.page.goto('/panel/profile');
    }

    async verifyProfileIsOpen(): Promise<void> {
        await expect(this.profileHeder).toBeVisible();
    }
    
    async verifyProfileName(expectedName: string): Promise<void> {
        await expect(this.profileName).toHaveText(expectedName);
    }
}