import { Sequelize } from "sequelize-typescript";
import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';




describe("Unit test of find user usecase", () => {
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

  it("should find product",async () => {
    const productRespository = new ProductRepository()
    const usercase = new FindProductUseCase(productRespository)

    const product = new Product("123", "car", 2.3)
    productRespository.create(product)

    const input = {id: "123"}
    const result = await usercase.execute(input)
    expect(result).toEqual({
      id: "123", 
      name: "car",
      price: 2.3,
    })
  })
})
