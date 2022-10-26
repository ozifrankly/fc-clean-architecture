import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';


describe("Unit test of update usecase", () => {
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

  it("should update products",async () => {
    const productRespository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRespository)

    const product = new Product("123", "car", 2.3)
    productRespository.create(product)

    const input = {
      id: "123",
      name: "car2",
      price: 3.2,
    }    
    const output = await usecase.execute(input)
    expect(output).toEqual(input)
  });
});
