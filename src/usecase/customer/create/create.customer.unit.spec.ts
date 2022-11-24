import CreateCustomerUseCase from "./create.customer.usecase";

const customerInput = {
    name: "Customer",
    address: {
        street: "Street 1",
        number: 123,
        zip: "Zip",
        city: "City 1"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Create customer use case unit test", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const createUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await createUseCase.execute(customerInput);

        expect(output).toEqual({
            id: expect.any(String),
            name: customerInput.name,
            address: {
                street: customerInput.address.street,
                number: customerInput.address.number,
                zip: customerInput.address.zip,
                city: customerInput.address.city,
            }
        })
    });

    it("should throw an error when customer name is missing", async () => {
        const customerRepository = MockRepository();
        const createUseCase = new CreateCustomerUseCase(customerRepository);
 
        customerInput.name = "";
        
        await expect(createUseCase.execute(customerInput)).rejects.toThrow("Name is required");
    });

    it("should throw an error when customer street is missing", async () => {
        const customerRepository = MockRepository();
        const createUseCase = new CreateCustomerUseCase(customerRepository);
 
        customerInput.address.street = "";
        
        await expect(createUseCase.execute(customerInput)).rejects.toThrow("Street is required");
    });

});