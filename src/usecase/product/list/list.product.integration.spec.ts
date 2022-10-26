import Product from '../../../domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';


describe("Unit test of findall usecase", () => {
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

  it("should findall products",async () => {
    const product1 = new Product("123", "car", 2.3)
    const product2 = new Product("456", "car2", 3.2)

    const productRespository = new ProductRepository()
    const usecase = new ListProductUseCase(productRespository)

    productRespository.create(product1)
    productRespository.create(product2)

    const result = await usecase.execute({})
    expect(result.products.length).toEqual(2)
    expect(result.products[0]).toEqual({
      id: "123", 
      name: "car",
      price: 2.3,
    })
    expect(result.products[1]).toEqual({
      id: "456", 
      name: "car2",
      price: 3.2,
    })
  })
});
