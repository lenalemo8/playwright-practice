import { test } from "../fixtures/userGaragePage";


test.describe('using fixtures', () => {
 test('Add Audi A8', async ({userGaragePage}) => {
            await userGaragePage.verifyPageIsOpen();
            await userGaragePage.addNewCar('Audi', 'A8', '999');
            await userGaragePage.verifyLastAddedCarName('Audi A8');
        })
        
})    