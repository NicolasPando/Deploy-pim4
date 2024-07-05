import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from 'src/Entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDbService {
    constructor(
       @InjectRepository(product)private readonly userRepository: Repository<product>) {}
    
    async create(user:any){
        return this.userRepository.save(user)
    }

    async getUsers(): Promise<product[]> {
        return this.userRepository.find();
      }
}
