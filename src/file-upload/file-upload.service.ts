import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUpLoadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from 'src/Entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private fileUploadRepository:FileUpLoadRepository,
        @InjectRepository(product)
        private readonly productRepository: Repository<product>
    ){}

    async uploadImage(file:Express.Multer.File, productId:string){
        const product = await this.productRepository.findAndCountBy({id: productId})        
        if(!product){
            throw new NotFoundException('Producto no encontrado')
        }
        const response = await this.fileUploadRepository.uploadImage(file)
        if(!response.secure_url){
            throw new NotFoundException('Error al subir imagen a cloudinary')
        }

         await this.productRepository.update(productId, {
            imgUrl: response.secure_url
        })
        
        const updatedProduct = await this.productRepository.findOneBy({id:productId})

        return updatedProduct;
    }
}
