import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product("123", "car", 2.3)
const input = {
  id: "123",
  name: "car2",
  price: 3.2,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test of update usecase", () => {
  it("should update products",async () => {
    const usecase = new UpdateProductUseCase(MockRepository())
    const output = await usecase.execute(input)
    expect(output).toEqual(input)
  });
});
