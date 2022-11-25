import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Create product unit tests", () => {

    it("should create a product using mock repository", async () => {
        const productRepository = MockRepository();
        const createUseCase = new CreateProductUseCase(productRepository);

        const productInput = {
            name: "Whey",
            price: 99
        }

        const output = await createUseCase.execute(productInput);

        expect(output).toEqual({
            id: expect.any(String),
            name: productInput.name,
            price: productInput.price
        });

    });

    describe("Unit test when product has an invalid field", () => {

        it("should throw an error when product name is missing", async () => {
            const productRepository = MockRepository();
            const createUseCase = new CreateProductUseCase(productRepository);
            const productInput = {
                name: "",
                price: 99
            }
    
            expect(createUseCase.execute(productInput)).rejects.toThrow("Name is required")
        });
        
        it("should throw an error when product price is missing", async () => {
            const productRepository = MockRepository();
            const createUseCase = new CreateProductUseCase(productRepository);
    
            const productInput = {
                name: "Whey",
                price: -1
            }
    
            expect(createUseCase.execute(productInput)).rejects.toThrow("Price must be greater than zero")
        });
    })
});