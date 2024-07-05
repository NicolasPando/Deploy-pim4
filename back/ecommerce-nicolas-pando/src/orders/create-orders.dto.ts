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
    
   /**
   * Debe ser un arreglo de id's de productos registrados en la base de datos
   * @example '[

     {

   "id":"b0d1524b-f29d-4891-8ec6-4e12f68c4571"

  },
     {

   "id":"b0d1524b-f29d-4891-8ec6-4e12f68c4571"

  }

    ]'
   */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<product[]>
}