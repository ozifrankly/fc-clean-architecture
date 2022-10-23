import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product("123", "car", 2.3)
const input = {id: "123"}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test of find user usecase", () => {
  it("should find product",async () => {
    const usercase = new FindProductUseCase(MockRepository())
    const product = await usercase.execute(input)
    expect(product).toEqual({
      id: "123", 
      name: "car",
      price: 2.3,
    })
  })
})
