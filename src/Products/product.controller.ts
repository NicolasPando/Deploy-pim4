import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto, updateProductDto } from "./create-product.dto";
import { AuthGuard } from "src/Auth/AuthGuard";
import { product } from "src/Entities/product.entity";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductService){}

    @HttpCode(200)
    @Get()
    getProducts(@Query('page') page?: number, @Query('limit') limit?: number){
        return this.productService.getProducts(page, limit)
    }

    @Get('seeder')
    addProducts(){
        return this.productService.resetData()
    }

    @HttpCode(200)
    @Get('profile/:id')
    getProductbyId(@Param("id") id:string){
        return this.productService.getProductById(id)
    }

    @HttpCode(201)
    @Post('add')
    PostProduct(@Body() products:Partial<product[]>){
        return this.productService.addProduct2(products)
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBody({ type: updateProductDto })
    @Put('update/:id')
    PutProduct(@Body() ProductDto:Partial<updateProductDto>,@Param("id") id:string){
        return this.productService.updateProduct(id, ProductDto)
    }
    
    @HttpCode(200)
    @Delete('delete/:id')
    DelenteProduct(@Param("id") id:string){
        return this.productService.deleteProduct(id)
    }
}