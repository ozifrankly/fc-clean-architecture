import Product from '../../../domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';

const product1 = new Product("123", "car", 2.3)
const product2 = new Product("456", "car2", 3.2)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1,product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test of findall usecase", () => {
  it("should findall products",async () => {
    const usecase = new ListProductUseCase(MockRepository())
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
