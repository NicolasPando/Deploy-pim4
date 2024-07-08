import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/Users/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @ApiOperation({
    summary: "Iniciar sesion"
  })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({status: 200, description: 'Usuario Logueado exitosamente'})
  @ApiResponse({status: 400, description: 'Email o Contraseña incorrectos'})
  @Post('signin')
  async signIn(@Body() credentials:LoginUserDto) {
    const { email,password } = credentials
    const result = await this.authService.signIn(email,password);
    return { message: result };
  }

  @HttpCode(201)
  @ApiOperation({
    summary: "Crear cuenta"
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({status: 201, description: 'Usuario creado exitosamente'})
  @ApiResponse({status: 409, description: 'El email ya esta registrado'})
  @ApiResponse({status: 400, description: 'Las credenciales no cumplen con los requisitos'})

    @Post('singup')
    singUp(@Body() user:CreateUserDto){
        return this.authService.singUp(user)
    }
}
