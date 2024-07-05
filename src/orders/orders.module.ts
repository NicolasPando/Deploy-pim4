import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { order } from 'src/Entities/order.entity';
import { orderdetail } from 'src/Entities/order-detail.entity';
import { users } from 'src/Entities/user.entity';
import { product } from 'src/Entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([order, orderdetail, users, product]),
  ],
  controllers: [OrdersController], 
  providers: [OrdersService, OrdersRepository], 
})
export class OrdersModule {}
