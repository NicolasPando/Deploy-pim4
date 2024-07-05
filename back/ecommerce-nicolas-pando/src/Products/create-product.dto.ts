export class ProductDto {
  /**
   * Debe ser un string
   * @example 'Test Product01'
   */
    name:string

   /**
   * Debe ser un string
   * @example 'Test Description of Product01'
   */
    description:string

   /**
   * Debe ser un number
   * @example '125.00'
   */
    price:number

    /**
   * Debe ser un string
   * @example '12'
   */
    stock:number
    /**
   * Debe ser un string
   * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
   */
    imgUrl:string
  }

  export class updateProductDto{
      /**
   * Debe ser un string
   * @example 'Test Product01'
   */
      name?:string

      /**
      * Debe ser un string
      * @example 'Test Description of Product01'
      */
       description?:string
   
       /**
      * Debe ser un number
      * @example '125.00'
      */
       price?:number
   
       /**
      * Debe ser un string
      * @example '12'
      */
       stock?:number
       /**
      * Debe ser un string
      * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
      */
       imgUrl?:string
  }