import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createCategoryDto {
  /**
   * Debe ser un string
   * @example 'TestCategory'
   */
  @IsNotEmpty()
  @IsString()
  name: string;
  }