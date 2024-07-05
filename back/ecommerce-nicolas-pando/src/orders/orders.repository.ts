import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { orderdetail } from "src/Entities/order-detail.entity";
import { order } from "src/Entities/order.entity";
import { product } from "src/Entities/product.entity";
import { users } from "src/Entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(order)
        private orderRepository: Repository<order>,
        @InjectRepository(orderdetail)
        private orderdetailRepository: Repository<orderdetail>,
        @InjectRepository(users)
        private usersRepository: Repository<users>,
        @InjectRepository(product)
        private productRepository: Repository<product>,
    ) {}

    async addOrder (userId:string, products: product[]){
        let total = 0;

        const user = await this.usersRepository.findOneBy({id: userId})
        if (!user){
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`)
        };
        
        const order2 = new order();
        order2.date = new Date()
        order2.user = user

        const newOrder = await this.orderRepository.save(order2);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productRepository.findOneBy({
                    id: element.id
                });
                if(!product){
                    throw new NotFoundException(`Producto con id ${element.id} no encontrado`)
                }
                total += Number(product.price);

                await this.productRepository.update(
                    { id:element.id },
                    { stock: product.stock - 1 }
                );
                return product;
            })
        );

        const orderDetail = new orderdetail();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder
        await this.orderdetailRepository.save(orderDetail);

        return await this.orderRepository.find({
            where:{id:newOrder.id},
            relations:{
                orderDetail:true
            }
        })
    }

    getOrder(id: string) {
        const order = this.orderRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        });
        
        if (!order) {
            throw new NotFoundException(`Orden con el id ${id} no encontrada`)
        }
        
        return order;
    }

    
}