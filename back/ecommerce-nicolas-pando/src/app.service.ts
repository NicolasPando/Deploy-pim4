import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './Categories/categories.repository';
import { ProductsRepository } from './Products/products.repository';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private productsRepository: ProductsRepository
  ) {}

  async onModuleInit() {
    try {
      // Espera a que addCategories termine
      await this.categoriesRepository.addCategories();
      console.log(await this.categoriesRepository.getCategories());

      // Luego espera a que addProduct termine
      await this.productsRepository.addProduct();
      console.log('Productos añadidos exitosamente.');
    } catch (error) {
      console.error('Error al inicializar datos:', error);
    }
  }
}
