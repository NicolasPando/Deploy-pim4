import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { product } from "src/Entities/product.entity"

export class createOrderDto{
    
   /**
   * Debe ser un string de tipo UUID de un usuario registrado en la base de datos
   * @example '550e8400-e29b-41d4-a716-446655440000'
   */
    @IsNotEmpty()
    @IsUUID()
    userId:string
    
    @ApiProperty({
      description: 'Debe ser un arreglo de IDs de productos registrados en la base de datos, ambos deben ser diferentes',
      example: [
        { id: 'b0d1524b-f29d-4891-8ec6-4e12f68c4571' },
        { id: '6dc8d41c-cd10-4d18-918d-ac0afc540ed3' }
      ],
      type: [String],
      isArray: true,
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<product[]>
}