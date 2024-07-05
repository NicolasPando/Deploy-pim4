import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { product } from "src/Entities/product.entity";
import { category } from "src/Entities/category.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { order } from "src/Entities/order.entity";
import { orderdetail } from "src/Entities/order-detail.entity";
import { UsersRepository } from "src/Users/users.repository";
import { users } from "src/Entities/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([product, category, order, orderdetail, users])],
    controllers:[ProductController],
    providers:[ProductService, ProductsRepository, OrdersRepository, UsersRepository],
})

export class ProductsModule{}