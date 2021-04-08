import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      brand: "Brand",
      category_id: "category_id",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with the same license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      brand: "Brand",
      category_id: "category_id",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Description car",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
        brand: "Brand",
        category_id: "category_id",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("Should not be able to create a car with with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234",
      brand: "Brand",
      category_id: "category_id",
    });
    expect(car.available).toBe(true);
  });
});
