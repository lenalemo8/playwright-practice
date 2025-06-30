// import { test as base } from '@playwright/test';
// import GaragePage from '../pom/pages/GaragePage';

// type Fixtures = {
//   userGaragePage: GaragePage;
// };

// export const test = base.extend<Fixtures>({
//   userGaragePage: async ({ browser }, use) => {
//     const context = await browser.newContext({
//       storageState: 'test-data/states/mainUserState.json',
//     });

//     const page = await context.newPage();
//     await page.goto('https://qauto.forstudy.space/panel/garage');
//     const garagePage = new GaragePage(page);

//     await use(garagePage);

//     await context.close();
//   },
// });

// export { expect } from '@playwright/test';
