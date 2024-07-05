import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import {config as dotenvConfig} from 'dotenv'
import { Role } from "src/Users/roles.enum";
dotenvConfig({path:'.env'})

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if(!token){
      throw new UnauthorizedException('No se ha enviado el token');      
    }

    try {
      const secret = process.env.JWT_SECRETWORD;
      const user = this.jwtService.verify(token, {secret});
      if(!user){
        throw new UnauthorizedException('Error al validar token')
      }
      user.exp = new Date(user.exp * 1000);

      user.roles = user.isAdmin ? [Role.Admin] : [Role.User]

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Error al validar token')
    }
    return ;
  }
}