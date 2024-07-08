import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { createCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository:CategoriesRepository){}

    addCategories(){
        return this.categoriesRepository.addCategories()
    }

    createCategory(newCategory:createCategoryDto){
        return this.categoriesRepository.createCategory(newCategory)
    }

    getCategories(){
        return this.categoriesRepository.getCategories()
    }
}
