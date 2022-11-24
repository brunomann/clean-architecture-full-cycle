import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private _customerRepository: CustomerRepositoryInterface;

    constructor(repository: CustomerRepositoryInterface){
        this._customerRepository = repository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto>{
        const listCustomerUseCase = await this._customerRepository.findAll();
 
        return OutputMapper.toOuput(listCustomerUseCase);
    }
}

class OutputMapper {
    static toOuput(customers: Customer[]):OutputListCustomerDto {
        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                }
            }))
        } 
    }
}