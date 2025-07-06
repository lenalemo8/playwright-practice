import test, { expect } from "@playwright/test";
import { HomePage } from "../../pom/pages/HomePage";
import { SignInForm } from "../../pom/forms/SignInForm";
import { usersList } from "../../test-data/users";
import AuthController from "../../api/controllers/AuthController";

let homePage: HomePage;
let signInForm: SignInForm;
let authController: AuthController;


test.describe("Cars API tests", () => {
  let sid: string;
  let carIdForRemoving: string;

  test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signInForm = new SignInForm(page);
});
  test.beforeAll(async ({ request }) => {
    authController = new AuthController(request);

    sid = await authController.getAuthCookie(
      usersList.mainUser.email,
      usersList.mainUser.password
    );

    const carToAdd = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 500,
    };

    const createCarForRemoving = await request.post("/api/cars/", {
      data: carToAdd,
      headers: {
        Cookie: sid,
      },
    });
    const body = await createCarForRemoving.json();
    carIdForRemoving = body.data.id;
    expect(carIdForRemoving).not.toBeUndefined();
  });
  test("Get cars [/api/cars/]", async ({ request }) => {
    const response = await request.get("/api/cars/", {
      headers: {
        Cookie: sid,
      },
    });
    expect(response.status()).toBe(200);
  });

  test("Add new car Audi TT [/api/cars/]", async ({ request }) => {
    const carToAdd = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 500,
    };
    const response = await request.post("/api/cars/", {
      data: carToAdd,
      headers: {
        Cookie: sid,
      },
    });
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(201);
    expect(body.data.carBrandId).toBe(carToAdd.carBrandId);
    expect(body.data.carModelId).toBe(carToAdd.carModelId);
    expect(body.data.mileage).toBe(carToAdd.mileage);
    expect(body.data.initialMileage).toBe(carToAdd.mileage);
    expect(body.data.brand).toBe("Audi");
  });
  

  test("Should not create car without authentication", async ({ request }) => {
    const carToAdd = {
      carBrandId: 2,
      carModelId: 1,
      mileage: 500,
    };

    const response = await request.post("/api/cars/", {
      data: carToAdd,
    });

    const body = await response.json();
    console.log("Unauthenticated Create Car Response:", body);

    expect(response.status()).toBe(401);
    expect(body.status).toBe("error");
    expect(body.message).toContain("Not authenticated");
  });
  test('Should return 400 for invalid car data', async ({ request }) => {
      const invalidCarData = {
          carBrandId: 9999,   
          carModelId: 9999,   
          mileage: -100    
      };

      const response = await request.post("/api/cars/", {
        data: invalidCarData,
          headers: {
            Cookie: sid,
        }
      });

      const body = await response.json();
      console.log('Invalid Data Response:', body);

      expect(response.status()).toBe(400); 
      expect(body.status).toBe('error');
      expect(body.message || body.errors).toBeDefined();
    });
  });
