import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';

export default class ListProductUseCase{
  private repository: ProductRepositoryInterface

  constructor(repository: ProductRepositoryInterface){
    this.repository = repository
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto>{
    const products = await this.repository.findAll()
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        }
      })
    }
  
  }
}