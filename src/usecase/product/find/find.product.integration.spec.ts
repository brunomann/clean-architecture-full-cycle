import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Find product integration tests", () => {
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

    it("should find a product using sequelize", async () => {
        const product = new Product("1", "Creatina", 89);
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        await productRepository.create(product);

        const input = {id: product.id};
        const output = await findProductUseCase.execute(input);

        expect(input.id).toBe(output.id);
        expect(product.name).toBe(output.name);
        expect(product.price).toBe(output.price);
    });
});