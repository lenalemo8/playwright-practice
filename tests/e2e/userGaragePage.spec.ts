import { test } from "../../fixtures/userGaragePage";

test.describe('using fixtures', () => {
    test('Add BMW X5', async ({userGaragePage}) => {
            await userGaragePage.verifyPageIsOpen();
            await userGaragePage.addNewCar('BMW', 'X5', '999');
            await userGaragePage.verifyLastAddedCarName('BMW X5');
        })
    test ('Delete BMW X5', async ({userGaragePage}) => {
            await userGaragePage.verifyPageIsOpen();
            await userGaragePage.deleteBMWCar();
        })
})