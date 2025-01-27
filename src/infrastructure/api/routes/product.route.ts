import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository);
  try{
    const product = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(product);
    res.send(output)
  }catch(err){
    res.status(500).send(err)
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const products = await usecase.execute({})
  
  res.send(products)
})
