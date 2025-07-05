import { expect, Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';


export class GaragePage extends BasePage {
    private readonly pageHeader: Locator = this.page.locator('//h1', { hasText: 'Garage' });
    private readonly addNewCarButton: Locator = this.page.locator('//button[contains(@class, "btn-primary")]');
    private readonly brandDropdown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropdown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly submitAddingCarButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');
    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');
    private readonly bmwCarEditButton: Locator = this.page.locator('//div[@class="car jumbotron"][.//p[@class="car_name h2" and text()="BMW X5"]]//button[contains(@class, "car_edit")]');
    private readonly bmwCarRemove1Button: Locator = this.page.locator('//button[@type="button" and contains(@class, "btn-outline-danger") and text()="Remove car"]');
    private readonly bmwCarRemove2Button: Locator = this.page.locator('//button[@type="button" and contains(@class, "btn-danger")]');
    private readonly carList: Locator = this.page.locator('//div[contains(@class, "panel-empty")]//p[@class="h3 panel-empty_message" and text()="You don’t have any cars in your garage"]');
    
    async open(): Promise<void> {
        await this.page.goto('/panel/garage');
    }

    async addNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitAddingCarButton.click();
        await this.page.waitForTimeout(500);
    }

    async verifyLastAddedCarName(expectedName: string): Promise<void> {
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async verifyPageIsOpen(): Promise<void> {
        await expect(this.pageHeader).toBeVisible();
    }
    async deleteBMWCar(): Promise<void> {
        await this.bmwCarEditButton.click();
        await this.bmwCarRemove1Button.click();
        await this.bmwCarRemove2Button.click();
        await expect(this.carList).not.toBeVisible();
    }
}
