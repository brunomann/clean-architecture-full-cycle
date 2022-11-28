import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";



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

    it("should update a product using sequelize", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product1 = new Product("1", "Whey", 99);
        await productRepository.create(product1);

        const inputProduct = {
            id: product1.id,
            name: "Powerade",
            price: 5.99
        }

        const output = await updateProductUseCase.execute(inputProduct);

        expect(output).toEqual({
            id: inputProduct.id,
            name: inputProduct.name,
            price: inputProduct.price
        });


    });
});