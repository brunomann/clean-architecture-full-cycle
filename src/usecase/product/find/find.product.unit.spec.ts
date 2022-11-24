import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const productMocked = new Product("1", "Whey", 99);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(productMocked)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Find product unit tests", () => {
    it("should find a product using mock repository", async() => {
        const mockRepository = MockRepository();
        const findUseCase = new FindProductUseCase(mockRepository);

        const output = await findUseCase.execute({id: "1"});

        expect(output.id).toBe(productMocked.id);
        expect(output.name).toBe(productMocked.name);
        expect(output.price).toBe(productMocked.price);
    });

    it("should throw an error when product is not found", async() => {
        const mockRepository = MockRepository();
        const findUseCase = new FindProductUseCase(mockRepository);
        mockRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        expect(() => {
            return findUseCase.execute({id: "2"})
        }).rejects.toThrow("Product not found");
    });
})