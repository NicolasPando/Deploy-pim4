import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, Query, UseGuards, ParseUUIDPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto, updateProductDto } from "./create-product.dto";
import { AuthGuard } from "src/Auth/AuthGuard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/Users/roles.enum";
import { RolesGuard } from "src/Auth/roles.guard";

@ApiTags('products')
@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductService){}

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiQuery({
        name: 'page',
        type: 'number',
        description: 'Número de página en la lista de productos (default: 1)',
        required: false
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'Cantidad de productos mostrados en una página (default: 5)',
        required: false
    })
    @ApiOperation({ summary: 'Obtener lista de productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.' })
    @ApiResponse({ status: 401, description: 'Esta ruta solo es accesible por administradores.' })
    @Get()
    getProducts(@Query('page') page?: number, @Query('limit') limit?: number){
        return this.productService.getProducts(page, limit)
    }
    @HttpCode(200)
    @ApiOperation({ summary: 'Reset de productos' })
    @ApiResponse({ status: 200, description: 'Productos añadidos exitosamente.' })
    @ApiResponse({ status: 400, description: 'No es posible reiniciar los datos, hay productos en uso.' })
    @Get('seeder')
    addProducts(){
        return this.productService.resetData()
    }

    @HttpCode(200)
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiOperation({ summary: 'Obtener producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
    @Get('profile/:id')
    getProductbyId(@Param("id") id:string){
        return this.productService.getProductById(id)
    }

    @HttpCode(201)
    @ApiOperation({ summary: 'Añadir nuevo producto' })
    @ApiBody({ type: ProductDto })
    @ApiResponse({ status: 201, description: 'Producto añadido exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos de solicitud incorrectos.' })
    @Post('add')
    PostProduct(@Body() products:ProductDto){
        return this.productService.addProduct2(products)
    }

    @HttpCode(200)
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @ApiBody({ type: updateProductDto })
    @ApiOperation({ summary: 'Actualizar producto' })
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
    @ApiResponse({ status: 401, description: 'Esta ruta solo es accesible por administradores.' })
    @UseGuards(AuthGuard)
    @ApiBody({ type: updateProductDto })
    @Put('update/:id')
    PutProduct(@Body() ProductDto:updateProductDto,@Param("id",ParseUUIDPipe) id:string){
        return this.productService.updateProduct(id, ProductDto)
    }
    
    @HttpCode(200)
    @ApiOperation({ summary: 'Eliminar producto' })
    @ApiParam({ 
        name: 'id', 
        type: 'string', 
        description: 'UUID del producto que se quiera actualizar', 
        required: true 
    })
    @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
    @Delete('delete/:id')
    DelenteProduct(@Param("id") id:string){
        return this.productService.deleteProduct(id)
    }
}