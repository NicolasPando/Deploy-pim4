import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './create-orders.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService:OrdersService){}

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order:createOrderDto){
        const{userId, products} = order
        return this.orderService.addOrder(userId,products)
    }

    @Get()
    @UseGuards(AuthGuard)
    getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
    }
}
