import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from 'src/Entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}
