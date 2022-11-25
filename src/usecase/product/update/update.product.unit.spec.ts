import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Whey", 99);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Update product unit test", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Whey Concentrado 80%",
            price: 120
        }
        const output = await updateUseCase.execute(input);

        expect(output).toEqual(input);

    });
});