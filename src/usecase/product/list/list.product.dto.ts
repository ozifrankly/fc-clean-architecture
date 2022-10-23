export interface InputListProductDto{}

type ListProductDto = {
  id: string,
  name: string,
  price: number,
}

export interface OutputListProductDto{
  products: ListProductDto[]
}