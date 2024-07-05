import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/Users/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() credentials:LoginUserDto) {
    const { email,password } = credentials
    const result = await this.authService.signIn(email,password);
    return { message: result };
  }

  @HttpCode(201)
    @Post('singup')
    singUp(@Body() user:CreateUserDto){
        return this.authService.singUp(user)
    }
}
