import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto, updateProductDto } from "./create-product.dto";
import { product } from "src/Entities/product.entity";

@Injectable()
export class ProductService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProducts(page:number, limit:number) {
        return await this.productsRepository.getProducts(page, limit);
    }

    async resetData() {
        return this.productsRepository.resetData()
    }

    async preloadData() {
        return this.productsRepository.addProduct()
    }

    

    async addProduct2(products:ProductDto) {
        return this.productsRepository.addProduct2(products)
    }

    async getProductById(id:string){
        return this.productsRepository.getProductById(id)
    }

    async deleteProduct(id:string) {
        return this.productsRepository.deleteProduct(id)
    }

    async updateProduct(id:string, ProductDto:Partial<updateProductDto>){
        return this.productsRepository.updateProductById(id, ProductDto)
    }
}