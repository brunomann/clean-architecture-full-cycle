import {Sequelize} from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Find customer use case integration test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customer = new Customer("1", "Bruno");
        const customerAddress = new Address("Street 1", 1, "93933939", "City 1");
        customer.changeAddress(customerAddress);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);
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


});