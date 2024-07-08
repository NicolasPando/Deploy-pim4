import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/Auth/AuthGuard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUpLoadService:FileUploadService){}
    
    @Post('uploadImage/:id')
    @ApiOperation({summary:'Carga de imagen Cloudinary a un producto'})
    @ApiParam({
        name:"id",
        type:"string",
        description:'Id del producto al cual se le asignara la nueva imagen',
        required:true
    })
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadImage(@Param('id') productid:string, 
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize:200000,
                    message:'Supera el máximo permitido: 200kb'
                }),
                new FileTypeValidator({
                    fileType:/(.jpg|.png|.jpeg|.webp)/,
                })
            ]
        })
    ) file:Express.Multer.File) {
        return this.fileUpLoadService.uploadImage(file, productid)
    }
}
