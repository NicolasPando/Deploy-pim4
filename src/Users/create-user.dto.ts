import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength, Validate, isEmpty, maxLength } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto {

  /**
   * Debe ser un string de entre 4 y 80 caracteres
   * @example 'Test User01'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  
  /**
   * Debe ser un string con formato email
   * @example 'user01@example.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe contener entre 8 y 15 caracteres, debe incluir almenos una minuscula, una mayuscula, un numero y un caracter especial
   * @example 'aaBB11##'
  */
 @IsNotEmpty()
 @IsString()
 @MinLength(8)
 @MaxLength(15)
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
   message: "'La contraseña es demasiado débil. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial de !@#$%^&*'"
  })
  password: string;

  /**
   * Debe coincidir con el password
   * @example 'aaBB11##'
  */  
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword:string;
  
  /**
   * Debe ser un string de entre 3 y 80 caracteres
   * @example 'TestStreet1234'
  */  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un number
   * @example 12345678
  */  
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string de entr 4 y 20 caracteres
   * @example 'Peru'
  */
 @IsNotEmpty()
 @IsString()
 @MinLength(4)
 @MaxLength(20)
 country: string;
 
 /**
  * Debe ser un string de entr 5 y 20 caracteres
  * @example 'Test City'
 */
@IsNotEmpty()
@IsString()
@MinLength(5)
@MaxLength(20)
city: string;

@ApiHideProperty()
@IsEmpty()
isAdmin?:boolean;
};

export class LoginUserDto extends PickType(CreateUserDto ,[
  'email',
  'password'
]) {}

export class UpdateUserDto {

  /**
   * Debe ser un string de entre 4 y 80 caracteres
   * @example 'Test User01'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string de entre 3 y 80 caracteres
   * @example 'adres User01'
   */
  
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un number
   * @example '12345678'
   */
  @IsOptional()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string de entre 4 y 20 caracteres
   * @example 'country User01'
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;
  
  /**
   * Debe ser un string de entre 4 y 80 caracteres
   * @example 'city User01'
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class PasswordUserDto {

  /**
   * Debe ser el password asociado actualmente al usuario
   * @example 'aaBB11##'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: "'La contraseña es demasiado débil. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial de !@#$%^&*'"
  })
  password: string;

  /**
   * Debe contener entre 8 y 15 caracteres, debe incluir almenos una minuscula, una mayuscula, un numero y un caracter especial
   * @example 'bbCC22##'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: "'La contraseña es demasiado débil. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial de !@#$%^&*'"
  })
  newpassword: string;

  /**
   * Debe ser exactamente igual al newpassword
   * @example 'bbCC22##'
  */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: "'La contraseña es demasiado débil. Debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial de !@#$%^&*'"
  })
  confirmPassword:string;

}