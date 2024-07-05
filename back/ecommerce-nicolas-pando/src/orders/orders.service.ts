import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { product } from 'src/Entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(private ordersRepository:OrdersRepository){}

    addOrder(userId:string, products:product[]){
        return this.ordersRepository.addOrder(userId,products)
    }

    getOrder(id:string){
        return this.ordersRepository.getOrder(id)
    }
}
