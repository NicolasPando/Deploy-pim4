import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './create-orders.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService:OrdersService){}

    @HttpCode(201)
    @ApiOperation({ summary: 'Añadir nueva orden' })
    @ApiBody({ type: createOrderDto })
    @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de solicitud incorrectos.' })
    @Post()
    addOrder(@Body() order:createOrderDto){
        const{userId, products} = order
        return this.orderService.addOrder(userId,products)
    }

    @ApiOperation({ summary: 'Obtener lista de ordenes de un usuario' })
    @ApiQuery({
        name: "id",
        type:"string",
        description:"Id del usuario dueño de las ordenes a obtener",
        required:true
    })
    @ApiResponse({ status: 200, description: 'Lista de ordenes obtenida exitosamente.' })
    @Get()
    getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
    }
}
