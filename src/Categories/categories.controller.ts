import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createCategoryDto } from './create-category.dto';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Users/roles.enum';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor (private categoryService:CategoriesService){}

    @ApiOperation({ summary: 'Seeder de categorías' })
    @ApiResponse({ status: 200, description: 'Categorías añadidas exitosamente.' })
    @Get('seeder')
    addCategories(){
        return this.categoryService.addCategories()
    }

    
    @ApiOperation({summary:'Obtener todas las categorías'})
    @ApiResponse({status:200, description:'Categorías obtenidas con éxito'})
    @ApiResponse({status:404, description:'No se encontraron categorías'})
    @Get()
    getCategories (){
        return this.categoryService.getCategories()
    }
    
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiOperation({summary:'Agregar una categoría'})
    @ApiBody({type:createCategoryDto})
    @ApiResponse({status:200, description:"La categoría se creó exitosamente"})
    @ApiResponse({status:409, description:"La categoría ingresada ya existe en la base de datos"})
    @ApiResponse({ status: 401, description: 'Esta ruta solo es accesible por administradores.' })
    @Post('create')
    createCategory(@Body() newCategory:createCategoryDto){
        return this.categoryService.createCategory(newCategory)
    }
}
