import { test as base } from '@playwright/test';
import { GaragePage } from '../pom/pages/GaragePage';
import { HomePage } from '../pom/pages/HomePage';
import { SignInForm } from '../pom/forms/SignInForm';
import { usersList } from '../test-data/users';

type PageFixtures = {
    garagePage: GaragePage,
    garageAsUserWithRemovingCars: GaragePage,
    

};


export const test = base.extend<PageFixtures>({
    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await use(garagePage);
    },
    garageAsUserWithRemovingCars: async ({ page }, use) => {
        let homePage = new HomePage(page);
        let signInForm = new SignInForm(page);
        let garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
        await garagePage.verifyPageIsOpen();
        await use(garagePage);
        await page.locator('//span[@class="icon icon-edit"]').first().click();
        await page.locator('//button[@class="btn btn-outline-danger"]').click();
        await page.locator('//button[@class="btn btn-danger"]').click();
    },

})

export { expect } from '@playwright/test';