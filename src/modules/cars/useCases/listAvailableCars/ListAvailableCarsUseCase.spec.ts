import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car description",
      daily_rate: 160.0,
      license_plate: "car_license_plate",
      fine_amount: 110,
      brand: "car brand",
      category_id: "sample_category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car description",
      daily_rate: 160.0,
      license_plate: "car_license_plate",
      fine_amount: 110,
      brand: "car brand",
      category_id: "sample_category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({ brand: "car brand" });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car description",
      daily_rate: 160.0,
      license_plate: "car_license_plate",
      fine_amount: 110,
      brand: "car brand",
      category_id: "sample_category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({ name: "Car Name" });
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car description",
      daily_rate: 160.0,
      license_plate: "car_license_plate",
      fine_amount: 110,
      brand: "car brand",
      category_id: "sample_category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "sample_category_id",
    });
    expect(cars).toEqual([car]);
  });
});
