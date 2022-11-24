import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer =  CustomerFactory.createWithAddress("Bruno", new Address("Street", 123, "123", "Porto Alegre"));
const input = {
    id: customer.id,
    name: "Bruno Update",
    address: {
        street: "Street A",
        number: 1,
        zip: "1234",
        city: "City"
    }
}

const MockRepository = () => {
    return { 
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {

    it("should updtate a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(input).toEqual(output);
    });

});