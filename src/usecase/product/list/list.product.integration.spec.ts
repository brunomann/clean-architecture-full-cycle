import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";


describe("", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should list all product using sequelize", async () => {
        const productRepository = new ProductRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);

        const product1 = new Product("1", "Whey", 99);
        const product2 = new Product("2", "Gatorade", 4.99);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await listProductUseCase.execute({});

        expect(output.products[0]).toEqual({
            id: product1.id,
            name: product1.name,
            price: product1.price
        });

        expect(output.products[1]).toEqual({
            id: product2.id,
            name: product2.name,
            price: product2.price
        });
    });
});