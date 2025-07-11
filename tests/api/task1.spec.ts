import test from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { usersList } from '../../test-data/users';
import { ProfilePage } from '../../pom/pages/ProfilePage';
import { GaragePage } from '../../pom/pages/GaragePage';

let homePage: HomePage;
let signInForm: SignInForm;
let profilePage: ProfilePage;
let garagePage: GaragePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signInForm = new SignInForm(page);
  profilePage = new ProfilePage(page);
  garagePage = new GaragePage(page);

});

  test('Mock response', async ({ page }) => {
    await homePage.open();
    await homePage.clickSignInButton();
 

    await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: "ok",
        data: {
          userId: 226970,
          photoFilename: "default-user.png",
          name: "Helen ",
          lastName: "Elkin",
        }
      }),
    });
  });
  
  await signInForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
  await homePage.clickProfileSidebarBtn();
  await profilePage.verifyProfileName('Helen Elkin');
});