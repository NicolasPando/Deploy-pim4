import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { category } from "src/Entities/category.entity";
import { Repository } from "typeorm";
import * as data from "./data.json"
import { createCategoryDto } from "./create-category.dto";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(category)
        private categoriesRepository: Repository<category>
    ) {}
    
    async getCategories (){
    const categories = await this.categoriesRepository.find()
    if(categories.length === 0){
        throw new NotFoundException('No se encontraron categorías')
    }
    return categories
    }

    async addCategories() {
    for (const element of data) {
    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(category)
      .values({ name: element.category })
      .orIgnore()
      .execute();
  }
  return "Categorías agregadas";
  }

async createCategory (newCategory:createCategoryDto){
    const categoriaduplicada = await this.categoriesRepository.findOne({where: { name: newCategory.name }})
    if(!categoriaduplicada){
        await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(category)
        .values({name: newCategory.name})
        .orIgnore()
        .execute()
        return `Categoría ${newCategory.name} agregada con exito`
        }else{
            throw new ConflictException("La categoría ingresada ya existe en la base de datos")
        }
    }
    
}

