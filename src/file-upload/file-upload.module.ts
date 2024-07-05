import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUpLoadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from 'src/Entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([product])],
  controllers: [FileUploadController],
  providers: [FileUploadService,CloudinaryConfig, FileUpLoadRepository]
})
export class FileUploadModule {}
