import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { category } from "src/Entities/category.entity";
import { Repository } from "typeorm";
import * as data from "./data.json"

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(category)
        private categoriesRepository: Repository<category>
    ) {}
    
    async getCategories (){
    return await this.categoriesRepository.find()
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

    
    //pruebas

    async updateCategory(id:string, newName:string){
        const category = await this.categoriesRepository.findOneBy({ id })

        if(category){
            category.name=newName
            await this.categoriesRepository.save(category)      
            return 'Categoría actualizada'      
        } else {
            throw new NotFoundException(`No se encontró una categoría con el id ${id}`)
        }
    }
}

