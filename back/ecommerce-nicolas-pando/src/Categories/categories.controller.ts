import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor (private categoryService:CategoriesService){}

    @Get('seeder')
    addCategories(){
        return this.categoryService.addCategories()
    }

    @Get()
    getCategories (){
        return this.categoryService.getCategories()
    }

    //pruebas

    @Put("update/:id")
    updateCategories (@Param('id') id:string, @Body() update){
        const {newName} = update
        return this.categoryService.updateCategory(id, newName)
    }
}
