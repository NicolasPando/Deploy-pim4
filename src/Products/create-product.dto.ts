import { IsDecimal, isDecimal, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
  /**
   * Debe ser un string
   * @example 'Test Product01'
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
  * Debe ser un string
  * @example 'Test Description of Product01'
  */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
  * Debe ser un number
  * @example '125.00'
  */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
  * Debe ser un string
  * @example '12'
  */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
  * Debe ser un string
  * @example 'Test category'
  */
  @IsNotEmpty()
  @IsString()
  category: string;

  /**
  * Debe ser un string
  * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
  */
  @IsNotEmpty()
  @IsString()
  imgUrl: string;
  }

  export class updateProductDto{
      /**
   * Debe ser un string
   * @example 'Test Product01'
   */
      @IsOptional()
      @IsString()
      name?:string

      /**
      * Debe ser un string
      * @example 'Test Description of Product01'
      */
      @IsOptional()
      @IsString()
       description:string
   
       /**
      * Debe ser un number
      * @example '125.00'
      */
       @IsOptional()
       @IsNumber()
       price:number
   
       /**
      * Debe ser un string
      * @example '12'
      */
       @IsOptional()
       @IsNumber()
       stock:number
       /**
      * Debe ser un string
      * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
      */
       @IsOptional()
       @IsString()
       imgUrl:string
  }