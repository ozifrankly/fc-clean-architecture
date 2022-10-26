import CreateProductUseCase from './create.product.usecase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';

const input = {
  name: "car",
  price: 123.21,
}

describe("Unit test of crease user usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create product",async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)
    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })  
  })


  it("should thrown an error when name is missing",async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    await expect(usecase.execute({...input, name: ""})).rejects.toThrow(
      "Name is required"
    );
  })

  it("should thrown an error when price is less than zero",async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    await expect(usecase.execute({...input, price: -1})).rejects.toThrow(
      "Price must be greater than zero"
    );
  })
})