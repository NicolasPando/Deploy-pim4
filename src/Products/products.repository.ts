import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { category } from "src/Entities/category.entity";
import { product } from "src/Entities/product.entity";
import { IsNull, Not, Repository } from "typeorm";
import * as data from "../Categories/data.json"
import { ProductDto, updateProductDto } from "./create-product.dto";
import { order } from "src/Entities/order.entity";




@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(product)
    private productsRepository: Repository<product>,
    @InjectRepository(category)
    private categoriesRepository: Repository<category>,
    @InjectRepository(order)
    private orderRepository: Repository<order>
  ){}

  async getProducts(page?: number, limit?:number) {
    
    if(!page){
      page = 1
    }
    if(!limit){
      limit = 5
    }
    const skip = (page - 1) * limit
    let products = await this.productsRepository.find({
      take:limit,
      skip: skip,
      relations:{
        category:true,
      },  
    });
    const start =(page - 1 ) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products
  }

  async getProductById (id:string){
    const product = await this.productsRepository.findOneBy({id});
    if(!product){
      return `Producto con el id ${id} no encontrado`
    }
    return product
  }
  
  async addProduct(){
    const categories = await this.categoriesRepository.find();
    for (const element of data) {
      const category = categories.find(cat => cat.name.toLowerCase() === element.category.toLowerCase());

      
      const product2 = new product();
        product2.name = element.name;
        product2.description= element.description;
        product2.price= element.price;
        product2.imgUrl= element.imgUrl;
        product2.stock= element.stock;
        product2.category= category;

        await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(product)
        .values(product2)
        .orIgnore()
        .execute()
    };
    return 'Producos agregados'
  }

  async resetData (){
    const orders = await this.orderRepository.find()
    const product = await this.getProducts(1, 2000)
    if(orders.length === 0){
    for (const element of product) {
        await this.productsRepository.delete(element.id);
    }
      await this.addProduct()
      return "Productos reiniciados"
    } else {
      throw new BadRequestException('No es posible reiniciar los datos, hay productos en uso')
    }

  }


  
  async addProduct2(newPrduct: ProductDto) {
    const categories = await this.categoriesRepository.find();
    const category = categories.find((cat) => cat.name.toLowerCase() === newPrduct.category.toLowerCase());
  
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    const product2 = new product();
    product2.name = newPrduct.name;
    product2.description = newPrduct.description;
    product2.price = newPrduct.price;
    product2.imgUrl = newPrduct.imgUrl;
    product2.stock = newPrduct.stock;
    product2.category = category;
  
    await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into('product')
      .values(product2)
      .orIgnore()
      .execute();
  
    return 'Producto agregado';
  }
  

  async updateProduct(id:string, product:product){
    await this.productsRepository.update(id,product);
    const updateProduct = await this.productsRepository.findOneBy({id});
    return updateProduct
  }

  


  async updateProductById(id:string, product:Partial<updateProductDto>){
    await this.productsRepository.update(id,product);
    const updatedProduct = await this.productsRepository.findOneBy({ id })
    return updatedProduct
  }

  async getProductWithOrderDetails(): Promise<product | undefined> {
    try {
        const product = await this.productsRepository.findOne({
            where: { orderDetail: Not(IsNull()) },
        });

        return product;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        throw error;
    }
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id)
    if(!product){
        throw new BadRequestException(`No se encontró el producto con ID ${id}`)
    }
    const result = await this.productsRepository.delete(id);
    return 'Producto eliminado';
 }
 
}