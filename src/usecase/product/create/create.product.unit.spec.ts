import CreateProductUseCase from './create.product.usecase';

const input = {
  name: "car",
  price: 123.21,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};


describe("Unit test of crease user usecase", () => {
  it("should create product",async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)
    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })  
  })


  it("should thrown an error when name is missing",async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)

    await expect(usecase.execute({...input, name: ""})).rejects.toThrow(
      "Name is required"
    );
  })

  it("should thrown an error when price is less than zero",async () => {
    const repository = MockRepository()
    const usecase = new CreateProductUseCase(repository)

    await expect(usecase.execute({...input, price: -1})).rejects.toThrow(
      "Price must be greater than zero"
    );
  })
})