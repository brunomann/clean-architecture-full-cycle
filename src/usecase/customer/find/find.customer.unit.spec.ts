import {Sequelize} from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1", "Bruno");
const customerAddress = new Address("Street 1", 1, "93933939", "City 1");
customer.changeAddress(customerAddress);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Find customer use case unit test", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const customerInput = {
            id: "1"
        };

        const result = await findCustomerUseCase.execute(customerInput);
        const customerOutput = {
            id: "1",
            name: "Bruno",
            address: {
                street: "Street 1",
                city: "City 1",
                number: 1,
                zip: "93933939"
            }
        };
        expect(result).toEqual(customerOutput);
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        const customerInput = {
            id: "1"
        };

        expect(() => {
            return findCustomerUseCase.execute(customerInput)
        }).rejects.toThrow("Customer not found");

    });


});