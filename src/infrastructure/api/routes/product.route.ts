import express, {Response, Request} from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try{
        const productDto = {
            name: req.body.name,
            price: req.body.price
        }
        const output = await useCase.execute(productDto);

        res.send(output);

    }catch(err) {
        res.status(500).send(err)
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    
    try{
        const output = await useCase.execute({});

        res.send(output);

    }catch(err) {
        res.status(500).send(err)
    }
});