import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private _productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this._productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto>{
        const products = await this._productRepository.findAll();

        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}