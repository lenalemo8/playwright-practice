import { expect, Page, Locator } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // async verifyErrorIsDisplayed(errorText: string): Promise<void> {
    //     await expect(this.page.getByText(errorText)).toBeVisible()
    // }
}