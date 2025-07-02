import { test as base } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';
import { usersList } from '../test-data/users';

type GarageLoggedIn = { 
    userGaragePage: GaragePage;
};

export const test = base.extend<GarageLoggedIn>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({storageState: usersList.mainUser.storagePath});
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await garagePage.verifyPageIsOpen();

    await use(garagePage);
    await context.close();
  },
});

export { expect } from '@playwright/test';
